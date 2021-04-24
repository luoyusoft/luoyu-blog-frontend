<template>
  <div class="container" id="container">
    <div class="preface">
      <p style="text-align: center;color: white;margin-left: 20px;font-size: 15px;">1. 拒绝打广告。</p>
      <p style="text-align: center;color: white;margin-left: 20px;margin-top: 20px;font-size: 15px;">2. 反黄反暴力。</p>
      <iv-divider></iv-divider>
      <div class="wall">
        <!-- 发表评论组件 -->
        <iv-input type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="留下点什么..." v-model="messagewall.comment"></iv-input>
        <iv-input class="common name" placeholder="昵称" v-model="messagewall.name" clearable><iv-icon type="ios-contact" slot="prefix" /></iv-input>
        <iv-input class="common email" placeholder="邮箱" v-model="messagewall.email" clearable><iv-icon type="ios-mail" slot="prefix" /></iv-input>
        <iv-input class="common email" placeholder="网址" v-model="messagewall.website" clearable><iv-icon type="ios-link" slot="prefix" /></iv-input>
        <iv-button type="info" plain @click="sendMessage(messagewall)" style="float: right; margin: 15px 0; display: block;background-color: #1e1f21; border: none">发表留言</iv-button>
      </div>
      <iv-divider></iv-divider>
      <div class="stack">
        <iv-icon size="22" color="white" type="ios-chatbubbles" style="float: left"></iv-icon>
        <p style="color: white;font-size: 18px;padding-left: 28px;padding-top: 4px;margin-bottom: 30px">{{ totalCount }}条留言</p>
        <messagewall-page-list-cell v-if="refresh" v-for="messagewall in messagewallList" :replyMessageWall="replyMessageWall" :messagewall="messagewall" :key="messagewall.id"></messagewall-page-list-cell>
        <browse-more @browseMore="getMessageWallList(false)" :noMoreData="noMoreData" ref="browseMore"></browse-more>
      </div>
    </div>
    <!-- 弹窗，回复功能使用 -->
    <iv-modal :title="'回复' + replyMessagewall.floorNum + '楼，' + '@' + replyMessagewall.replyName" v-model="dialogVisible" :footer-hide="true">
      <div style="height: 100%">
        <iv-input type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="留下点什么..." v-model="replyMessagewall.comment"></iv-input>
        <iv-input class="common name" placeholder="昵称" v-model="replyMessagewall.name" clearable><iv-icon type="ios-contact" slot="prefix" /></iv-input>
        <iv-input class="common email" placeholder="邮箱" v-model="replyMessagewall.email" clearable><iv-icon type="ios-mail" slot="prefix" /></iv-input>
        <iv-input class="common email" placeholder="网址" v-model="replyMessagewall.website" clearable><iv-icon type="ios-link" slot="prefix" /></iv-input>
        <iv-button type="info" plain @click="sendMessage(replyMessagewall)" style="float: right; margin: 15px 0; display: block;background-color: #1e1f21; border: none">发表评论</iv-button>
        <span slot="footer" class="dialog-footer"></span>
      </div>
    </iv-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import MessageWallPageListCell from '@/components/views/MessageWall/MessageWallPageListCell'
import BrowseMore from '@/components/views/BrowseMore'

export default {
  components: {
    'messagewall-page-list-cell': MessageWallPageListCell,
    'browse-more': BrowseMore
  },
  data () {
    return {
      totalCount: 0,
      currentPage: 1,
      pageSize: 5,
      noMoreData: false,
      // 模拟评论区数据
      messagewallList: [],
      // 关闭窗口 / 打开窗口的标识
      dialogVisible: false,
      messagewall: {
        email: '',
        name: '',
        comment: '',
        website: '',
        replyId: -1
      },
      replyMessagewall: {
        email: '',
        name: '',
        comment: '',
        website: '',
        replyId: -1,
        floorNum: ''
      },
      refresh: true
    }
  },
  created () {
    // 获取留言列表
    this.getMessageWallList(false)
  },
  methods: {
    // 添加留言
    sendMessage (messagewall) {
      // 必填项校验
      if (messagewall.name === '') {
        this.$Message.error('昵称不能为空！')
        return
      } else if (messagewall.comment === '') {
        this.$Message.error('内容不能为空！')
        return
      }
      this.$http({
        url: this.$http.adornUrl('/messagewall'),
        method: 'post',
        data: messagewall
      }).then((response) => {
        if (response && response.code === 200) {
          this.$Message.success('留言成功！')
          if (this.dialogVisible) {
            this.dialogVisible = false
          }
          this.currentPage = 1
          this.getMessageWallList(true)
          this.reload()
        } else {
          this.$Message.error(response.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取留言列表
    getMessageWallList (isRefresh) {
      let params = {
        limit: this.pageSize,
        page: this.currentPage
      }
      this.$http({
        url: this.$http.adornUrl('/messagewalls'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          if (!response.data.haveMoreFloor) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          if (isRefresh) {
            this.messagewallList = response.data.messageWallVOList
          } else {
            this.messagewallList = this.messagewallList.concat(response.data.messageWallVOList)
          }
          this.totalCount = response.data.totalCount
        }
      }).then(response => {
        this.$refs.browseMore.stopLoading()
      }).catch(error => {
        this.$refs.browseMore.stopLoading()
        console.log(error)
      })
      this.currentPage++
    },
    // 回复
    replyMessageWall (replyId, replyName, floorNum) {
      this.replyMessagewall.replyId = replyId
      // 设置回复的对象名称
      this.replyMessagewall.replyName = replyName
      this.replyMessagewall.floorNum = floorNum
      this.dialogVisible = true
    },
    reload () {
      // 移除组件
      this.refresh = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/index.styl";

/* 大框框 */
.container
  background-color: #393a3d
  border-radius $border-radius
  //overflow: hidden
  //box-shadow: 0.125rem 0.125rem 0.3125rem #888888
  //border: 0.0625rem solid white

/* 前言 */
.preface {
  padding: 20px 20px 20px
}

/* 留言墙*/
.wall
  margin-top: 20px
  margin-left: auto
  margin-right: auto
  width: 90%
  height: 100%
.common
  margin-top 10px
  float left
.name
  @media only screen and (max-width: 768px)
    width: 100%
  @media screen and (min-width: 768px)
    width: 32%
.email
  @media only screen and (max-width: 768px)
    width: 100%
  @media screen and (min-width: 768px)
    width: 32%
    margin-left 2%

/* 留言记录区*/
.stack
  margin-top: 20px
  margin-left: auto
  margin-right: auto
  margin-bottom: 5%
  width: 90%
</style>
