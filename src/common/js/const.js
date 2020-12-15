// 文字省略模式
export const LineBreakMode = {
  WrappingTruncatingTail: 1, // 显示头部文字内容，其他直接截断。
  WrappingTruncatingHead: 2, // 显示尾部文字内容，其他直接截断。
  EllipsisTruncatingTail: 3, // 结尾部分的内容以……方式省略，显示头的文字内容。
  EllipsisTruncatingMiddle: 4, // 中间的内容以……方式省略，显示头尾的文字内容。
  EllipsisTruncatingHead: 5 // 前面部分文字以……方式省略，显示尾部文字内容。
}

// 响应式断点
export const ResponsivePoint = {
  Sm: 768,
  Md: 992,
  Lg: 1200
}

// 默认请求数据时的limit size
export const DefaultLimitSize = 10

// section title默认的menus
export const ArticleDefaultFilterList = [
  {
    name: '最新',
    type: 'latest',
    active: true
  },
  {
    name: '点赞最多',
    type: 'like',
    active: false
  },
  {
    name: '阅读最多',
    type: 'read',
    active: false
  }
]

// section title默认的menus
export const VideoDefaultFilterList = [
  {
    name: '最新',
    type: 'latest',
    active: true
  },
  {
    name: '点赞最多',
    type: 'like',
    active: false
  },
  {
    name: '观看最多',
    type: 'watch',
    active: false
  }
]
