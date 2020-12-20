<template>
  <div class="chat-page-content">
    <div style="line-height: 25px">
      <p style="float: left;margin-left: 75%;">
        在线用户： {{online}}
        <br>
      </p>
      <iv-button @click="logout" style="float:left;margin-bottom: 10px;margin-left: 10px" size="small" type="error" plain>注销</iv-button>
    </div>
    <div class="chat-page-chat">
      <div class="page-loader" ref="loader">
        <div class="page-loader__spinner">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
          </svg>
        </div>
      </div>
      <div class="sidebar">
        <div class="card">
          <header>
            <img class="avatar" width="40" height="40" :alt="user.name" :src="user.avatar">
            <p class="name">{{user.name}}</p>
          </header>
          <footer>
            <iv-input class="search" type="text" placeholder="search user..."></iv-input>
          </footer>
        </div>
        <div class="list">
          <ul>
            <li :class="{ active: current_window_id === 0 }" @click="selectWindow(0)">
              <img class="avatar" width="30" height="30" src="/static/img/avatar/group.png" alt="">
              <p class="name">官方群组</p>
            </li>
            <li v-for="item in userList" v-bind:key="item.id" v-if="item.id !== form.id" :class="{ active: current_window_id === item.id }"
                @click="selectWindow(item.id)">
              <img class="avatar" width="30" height="30" :alt="item.name" :src="item.avatar">
              <p class="name">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="message" ref="box">
          <ul>
            <li v-for="(item,key) in messageList" v-bind:key="item.id" :id="key === (messageList.length - 1) ? 'end' : ''">
              <p class="time">
                <span>{{item.time}}</span>
              </p>
              <div :class="'main ' +  (item.from.name === user.name ? 'self': '')">
                <img class="avatar" width="30" height="30" :src="item.from.avatar" alt=""/>
                <span class="main-name">{{item.from.name}}</span>
                <div class="text">{{item.message}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="text">
          <iv-input
            v-model="form.message" @keyup.native.enter="send"
            type="textarea" :rows="5" placeholder="请输入内容，按 Enter 键发送">
          </iv-input>
          <div class="btn">
            <iv-button @click="clean" size="small" type="error">清空</iv-button>
            <iv-button @click="send" size="small" type="success">发送</iv-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      online: 0,
      websocket: undefined,
      user: {
        id: '',
        avatar: '',
        name: ''
      },
      form: {message: ''},
      // 当前激活窗口ID
      current_window_id: 0,
      // 在线用户列表
      userList: [],
      // 推送消息列表
      messageList: []
    }
  },
  updated () {
    this.scroll()
  },
  mounted () {
    this.init()
    this.$refs.loader.style.display = 'none'
  },
  created () {
    this.form.id = this.$route.params.userId
  },
  methods: {
    _message (message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    init () {
      /**
       * 加载用户信息
       */
      this.initUser()
      /**
       * 加载公共消息列表 -- 群组
       */
      this.initCommonMessage()
      /**
       * 每次刷新页面，主动链接WebSocket
       */
      this.initWebSocket()
    },
    initUser () {
      // 加载当前用户信息
      this.$http({
        url: this.$http.adornUrl('/chat/' + this.form.id),
        method: 'get'
      }).then(response => {
        this.user = response.data
      })
      // 加载在线用户列表
      this.$http({
        url: this.$http.adornUrl('/chat/online/list'),
        method: 'get'
      }).then(response => {
        let data = response.data
        if (data.length > 0) {
          this.userList = data
          this.online = this.userList.length
        }
      })
    },
    initWebSocket () {
      let $this = this
      this.websocket = new WebSocket('wss://luoyublog.com/api/luoyublog/chat/' + this.form.id)
      // 链接发送错误时调用
      this.websocket.onerror = function () {
        $this.$Message.error('WebSocket链接错误')
      }
      // 链接成功时调用
      this.websocket.onopen = function () {
        $this.$Message.success('WebSocket链接成功')
      }
      // 接收到消息时回调
      this.websocket.onmessage = function (event) {
        $this.clean()
        let entity = JSON.parse(event.data)
        // 上线提醒
        if (entity.data === undefined) {
          $this.initUser()
          $this.$Message.info(entity.msg)
          $this.scroll()
          return
        }
        // 消息接收
        let data = JSON.parse(event.data).data
        if (data.to !== undefined) {
          // 单个窗口发送，仅推送到指定的窗口
          if (data.from.id === $this.current_window_id) {
            $this.messageList.push(data)
          }
        } else {
          // 群发，推送到官方群组窗口
          $this.messageList.push(data)
        }
        $this.scroll()
      }
      // 链接关闭时调用
      this.websocket.onclose = function () {
        $this.$Message.info('WebSocket链接关闭')
      }
    },
    initCommonMessage () {
      this.$http({
        url: this.$http.adornUrl('/chat/common'),
        method: 'get'
      }).then(response => {
        if (response.data.length > 0) {
          this.messageList = response.data
        }
      })
    },
    initSelfMessage () {
      this.$http({
        url: this.$http.adornUrl('/chat/self/' + this.form.id + '/' + this.current_window_id),
        method: 'get'
      }).then(response => {
        this.messageList = response.data
      })
    },
    // 推送消息
    send () {
      if (this.form.message == null || this.form.message.trim() === '') {
        this._message('请输入消息内容', 'warning')
        return
      }
      if (!this.current_window_id) {
        this.websocket.send(this.form.message.replace(/[\r\n]/g, ''))
        this.initCommonMessage()
      } else {
        this.$http({
          url: this.$http.adornUrl('/chat/push/' + this.current_window_id),
          method: 'post',
          data: this.$http.adornData({
            'message': this.form.message,
            'from': this.user
          })
        }).then(response => {
          if (response.code === 200) {
            this.initSelfMessage()
            this.clean()
            this.$Message.success('消息推送成功')
          } else {
            this.$Message.error(response.msg)
          }
        })
      }
      this.scroll()
    },
    // 清空消息
    clean () {
      this.form.message = ''
    },
    // 注销
    logout () {
      this.$http({
        url: this.$http.adornUrl('/chat/' + this.form.id),
        method: 'delete'
      }).then(response => {
        this.websocket.close()
        this.$Message.success('注销成功')
        // 跳转登录页面
        this.$router.push({name: 'chat/login'})
      })
    },
    // 切换选择窗口
    selectWindow (id) {
      this.current_window_id = id
      if (!this.current_window_id) {
        this.initCommonMessage()
      } else {
        this.initSelfMessage()
      }
    },
    // 窗口滚动
    scroll () {
      let box = this.$refs.box
      box.scrollTop = 10000000
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/index.styl"

.chat-page-content
  text-align left
  padding 25px 5px 10px 5px
  @media only screen and (max-width: 768px)
    padding-top 10px
  @media screen and (min-width: 768px)
    padding-top 10px
  @media screen and (min-width: 992px)
    padding-top 10px
  .tags
    margin-bottom 18px
  .title
    font-size 27px
    line-height 33px
    font-weight 500
    color $color-typegraphy-title
    margin-bottom 25px
  .info
    margin-top 10px
    font-size 14px
    line-height 18px
    font-weight 200
    a
      color: #777
      cursor pointer
      &:hover
        color $color-main-primary
        text-decoration underline
    .publish-time
      margin-left 20px
  .operate_info
    text-align right
    font-size 14px
    margin 15px 0
    @media only screen and (max-width: 768px)
      text-align left
    span
      margin-right 10px
      + span
        margin-left 10px
      a
        cursor pointer
        &:hover
          color $color-main-primary
          text-decoration underline
  .abstract
    color $default-desc-color
    border 1px dashed $default-border-color
    background $default-border-color
    @media only screen and (max-width: $responsive-sm)
      padding 8px
      margin-top 8px
      font-size 13px
      line-height 18px
    @media screen and (min-width: $responsive-sm)
      padding 15px
      margin-top 8px
      font-size 14px
      line-height 24px
    @media screen and (min-width: $responsive-md)
      padding 20px
      margin-top 15px
      line-height 28px
    @media screen and (min-width: $responsive-lg)
      padding 20px
      margin-top 15px
      line-height 28px
.chat-page-chat {
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px; }
.chat-page-chat .sidebar, .chat-page-chat .main {
  height: 100%; }
.chat-page-chat .sidebar {
  float: left;
  width: 200px;
  color: #f4f4f4;
  background-color: #2e3238; }
.chat-page-chat .sidebar .list {
  overflow-y: scroll;
  height: 100%;
}
.chat-page-chat .main {
  position: relative;
  overflow: hidden;
  background-color: #eee; }
.chat-page-chat .text {
  /*position: absolute;*/
  /*width: 100%;*/
  bottom: 0;
  left: 0; }
.chat-page-chat .message {
  height: calc(100% - 182px); }

.list ul {
  margin: 0;
  padding: 0; }
.list li {
  list-style: none;
  padding: 12px 15px;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color .1s; }
.list li:hover {
  background-color: rgba(255, 255, 255, 0.03); }
.list li.active {
  background-color: rgba(255, 255, 255, 0.1); }
.list .avatar, .list .name {
  vertical-align: middle; }
.list .avatar {
  border-radius: 2px; }
.list .name {
  display: inline-block;
  margin: 0 0 0 15px; }

.card {
  padding: 12px;
  border-bottom: solid 1px #24272C; }
.card footer {
  margin-top: 10px; }
.card .avatar, .card .name {
  vertical-align: middle; }
.card .avatar {
  border-radius: 2px; }
.card .name {
  display: inline-block;
  margin: 0 0 0 15px;
  font-size: 16px; }
.card .search {
  padding: 0 10px;
  width: 100%;
  font-size: 12px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  border: solid 1px #3a3a3a;
  border-radius: 4px;
  outline: none;
  background-color: #26292E; }

.message {
  padding: 10px 15px;
  overflow-y: scroll; }
.message ul {
  margin-left: 1px; }
.message li {
  list-style: none;
  margin-bottom: 15px; }
.message .time {
  margin: 7px 0;
  text-align: center; }
.message .time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: #dcdcdc; }
.message .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px; }
.message .main-name {
  font-size: 11px;
  color: gray;
  display: inherit;
  font-weight: 500;
  margin-bottom: 5px; }
.message .text {
  height: auto !important;
  display: inline-block;
  position: relative;
  padding: 0 10px;
  max-width: calc(100% - 40px);
  min-height: 30px;
  line-height: 2.5;
  font-size: 12px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px; }
.message .text:before {
  content: " ";
  position: absolute;
  top: 9px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa; }
.message .self {
  text-align: right; }
.message .self .avatar {
  float: right;
  margin: 0 0 0 10px; }
.message .self .text {
  background-color: #b2e281; }
.message .self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281; }

.text {
  border: 1px solid #e6ebf5;
  height: 160px;
  background: white;
  border-top: solid 1px #ddd; }
.text textarea {
  padding: 10px;
  height: 66%;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none; }
.text .btn {
  float: right;
  margin: 3px 9px; }

.row {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: -15px;
  flex-wrap: wrap;
  margin-left: -15px;
}
.page-loader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f3f3f3;
  z-index: 999999999;
  align-items: center;
  justify-content: center;
  display: flex;
}

.page-loader__spinner {
  position: relative;
  width: 50px;
  height: 50px;
}
.page-loader__spinner svg {
  animation: rotate 2s linear infinite;
  transform-origin: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.page-loader__spinner svg circle {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes color {
  100%,
  0% {
    stroke: #ff5652;
  }
  40% {
    stroke: #2196F3;
  }
  66% {
    stroke: #32c787;
  }
  80%,
  90% {
    stroke: #ffc107;
  }
}
/*# sourceMappingURL=main.css.map */

</style>
