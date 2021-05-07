import axios from 'axios'
import qs from 'qs' // 字符串处理
import merge from 'lodash/merge' // 合并对象工具
import store from '@/store'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true, // 当前请求为跨域类型时是否在请求中协带cookie
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // 处理请求之前的配置
  store.commit('loadStatus', true)
  return config
}, error => {
  // 请求失败的处理
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  // if (response.data && response.data.code !== 200) { // 200 token失效
  //   alert(response.data.msg)
  // }
  store.commit('loadStatus', false)
  return response.data
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseApiUrl) + actionName
}

/**
 * get 请求参数处理
 * @param params
 * @param openDefaultParams
 * @returns {*}
 */
http.adornParams = (params = {}, openDefaultParams = false) => {
  var defaluts = {
    't': new Date().getTime()
  }
  return openDefaultParams ? merge(defaluts, params) : params
}

/**
 * post请求参数处理
 * @param data
 * @param openDefaultdata
 * @param contentType
 * @returns {string}
 */
http.adornData = (data = {}, openDefaultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefaultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * ******************** 封装各个api *******************************
 */

/* ******************** 文章相关 ****************************** */
/**
 * 获取首页文章列表
 */
http.listHomeArticles = (params) => {
  return http({
    url: http.adornUrl('/article/listhomearticles'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * 获取文章
 * @param articleId
 */
http.getArticle = (articleId) => {
  return http({
    url: http.adornUrl('/article/' + articleId),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 获取文章列表
 */
http.listArticles = (params) => {
  return http({
    url: http.adornUrl('/article/listarticles'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * 获取热读列表
 */
http.listHotReads = () => {
  return http({
    url: http.adornUrl('/article/listhotreadarticles'),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 文章点赞
 */
http.updateArticle = (id) => {
  return http({
    url: http.adornUrl('/article/' + id),
    method: 'put',
    data: http.adornData()
  })
}

/* ******************** 视频相关 ****************************** */
/**
 * 获取视频
 */
http.getVideo = (videoId) => {
  return http({
    url: http.adornUrl('/video/' + videoId),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 视频点赞
 */
http.updateVideo = (id) => {
  return http({
    url: http.adornUrl('/video/' + id),
    method: 'put',
    data: http.adornData()
  })
}

/**
 * 获取视频列表
 */
http.listVideos = (params) => {
  return http({
    url: http.adornUrl('/video/listvideos'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/* ******************** 友链相关 ****************************** */
/**
 * 获取友链列表
 */
http.listFriendLinks = () => {
  return http({
    url: http.adornUrl('/operation/listfriendlinks'),
    method: 'get',
    params: http.adornParams()
  })
}

/* ******************** 分类相关 ****************************** */
/**
 * 获取分类列表
 */
http.listCategorys = (params) => {
  return http({
    url: http.adornUrl('/operation/listcategories'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/* ******************** 留言墙相关 ****************************** */
/**
 * 获取留言墙列表
 */
http.listMessageWalls = (params) => {
  return http({
    url: http.adornUrl('/messagewall/listmessagewalls'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * 新增留言
 */
http.insertMessageWall = (messagewall) => {
  return http({
    url: http.adornUrl('/messagewall'),
    method: 'post',
    data: http.adornData(messagewall)
  })
}

/* ******************** 推荐相关 ****************************** */
/**
 * 获取推荐列表
 */
http.listRecommends = (params) => {
  return http({
    url: http.adornUrl('/operation/listrecommends'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/* ******************** 标签相关 ****************************** */
/**
 * 获取标签列表
 */
http.listTags = (params) => {
  return http({
    url: http.adornUrl('/operation/listtags'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/* ******************** 时间线相关 ****************************** */
/**
 * 获取时间线列表
 */
http.listTimelines = () => {
  return http({
    url: http.adornUrl('/timeline/listtimelines'),
    method: 'get',
    params: http.adornParams()
  })
}

/* ******************** 搜索相关 ****************************** */
/**
 * 获取搜索列表
 */
http.listSearchs = (params) => {
  return http({
    url: http.adornUrl('/search'),
    type: 'get',
    params: http.adornParams(params)
  })
}

/* ******************** 聊天室相关 ****************************** */
/**
 * 获取当前用户信息
 */
http.getUser = (id) => {
  return http({
    url: http.adornUrl('/chat/user/' + id),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 获取指定用户的聊天消息列表
 */
http.listMessages = (fromId, toId) => {
  return http({
    url: this.$http.adornUrl('/chat/listmessages/' + fromId + '/' + toId),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 获取公共聊天消息列表
 */
http.listCommonMessages = () => {
  return http({
    url: http.adornUrl('/chat/listcommonmessages'),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 获取在线用户列表
 */
http.listOnlineUsers = () => {
  return http({
    url: http.adornUrl('/chat/listonlineusers'),
    method: 'get',
    params: http.adornParams()
  })
}

/**
 * 向指定窗口推送消息
 */
http.insertMessage = (params, toId) => {
  return http({
    url: http.adornUrl('/chat/message/' + toId),
    method: 'post',
    data: http.adornData(params)
  })
}

/**
 * 新增用户
 */
http.insertUser = () => {
  return http({
    url: http.adornUrl('/chat/user'),
    method: 'post',
    data: http.adornData()
  })
}

/**
 * 用户登录
 */
http.userLogin = (params) => {
  return http({
    url: http.adornUrl('/chat/user/login'),
    method: 'post',
    data: http.adornData(params)
  })
}

/**
 * 用户修改
 */
http.updateUser = (params) => {
  return http({
    url: http.adornUrl('/chat/user'),
    method: 'put',
    data: http.adornData(params)
  })
}

export default http
