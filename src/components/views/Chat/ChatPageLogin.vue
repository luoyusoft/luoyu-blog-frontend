<template>
  <div class="chat-page-login-content">
    <div class="chat-page-login">
        <iv-form ref="form" :model="form">
          <iv-form-item prop="name" label="昵称" :label-width="80" required>
            <iv-input v-model="form.name"></iv-input>
          </iv-form-item>
          <iv-form-item prop="avatar" v-model="form.avatar" label="头像" :label-width="80">
            <div class="avatar-uploader">
              <div @click="handleEditAvatar" class="iv-upload">
                <img v-if="form.avatar" :src="form.avatar" class="avatar" alt="">
                <i v-else class="avatar-uploader-icon">
                  <iv-icon style="width: 100%;height: 100%;top: 50%;left: 50%;" type="ios-add-circle"></iv-icon>
                </i>
              </div>
            </div>
          </iv-form-item>
        </iv-form>
        <iv-button style="margin-left: 90%" type="primary" @click="login('form')">确定</iv-button>
      </div>
      <iv-modal title="点击选择头像" v-model="avatarDialog" width="40%" :footer-hide="true">
        <div class="modal-body">
          <form>
            <div class="row default_avatars_list">
                <img v-for="item in avatarList" v-bind:key="item.url" :src="item.url" @click="changeAvatar(item.url)" title="点击更换！" alt="">
            </div>
          </form>
        </div>
<!--        <span slot="footer" class="dialog-footer">-->
<!--              <iv-button type="primary">确 定</iv-button>-->
<!--              <iv-button @click="avatarDialog = false">取 消</iv-button>-->
<!--        </span>-->
      </iv-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

export default {
  data () {
    return {
      avatarDialog: false,
      form: {
        name: '',
        avatar: ''
      },
      avatarList: []
    }
  },
  methods: {
    handleEditAvatar () {
      axios.get('/static/img/avatar/avatar.json').then(response => {
        this.avatarList = response.data
      })
      this.avatarDialog = true
    },
    changeAvatar (url) {
      this.form.avatar = url
      this.avatarDialog = false
    },
    login (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.avatar === null || this.form.avatar === '') {
            this.$Message.error('请选择头像')
            return
          }
          this.form.id = new Date().getTime()
          this.$http({
            url: this.$http.adornUrl('/chat/login'),
            method: 'post',
            data: this.$http.adornData({
              'name': this.form.name,
              'avatar': this.form.avatar
            })
          }).then(response => {
            if (response && response.code === 200) {
              // 跳转聊天页面
              // window.location.href = api.redirect(this.form.id)
              // 更新url地址
              this.$router.push({name: 'chat', params: { userId: response.data }})
            } else {
              this.$Message.error(response.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/index.styl"

.chat-page-login-content
  height 100%
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

.chat-page-login {
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px; }
.chat-page-login .sidebar, chat-page-login .main {
  height: 100%; }
.chat-page-login .sidebar {
  float: left;
  width: 200px;
  color: #f4f4f4;
  background-color: #2e3238; }
.chat-page-login .sidebar .list {
  overflow-y: scroll;
  height: 100%;
}
.chat-page-login .main {
  position: relative;
  overflow: hidden;
  background-color: #eee; }
.chat-page-login .text {
  /*position: absolute;*/
  /*width: 100%;*/
  bottom: 0;
  left: 0; }
.chat-page-login .message {
  height: calc(100% - 182px); }

.avatar-uploader .iv-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .iv-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.iv-upload img {
  width: 178px;
  height: 178px;
  display: block;
}

.default_avatars_list {
  display: inline-block;
}
.row {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: -15px;
  flex-wrap: wrap;
  margin-left: -15px;
}
.default_avatars_list img {
  width: 11.3%;
  display: inline;
  margin: 1rem;
  border-radius: 3px;
  cursor: pointer;
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
