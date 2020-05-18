<!--
 * @Author: your name
 * @Date: 2020-05-18 00:32:20
 * @LastEditTime: 2020-05-19 00:26:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /luoyu-admin-frontend/README.md
--> 
## 项目简介
```
一直想做一款属于自己的个人博客，本项目是个人博客前端部分。
```

## 技术栈
```
npm：node.js的包管理工具，用于同一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。

ES6：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。

vue-cli：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。

vue-router： Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。

vuex：Vue提供的状态管理工具，用于同一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。

element-ui：基于MVVM框架Vue开源出来的一套前端ui组件。
```

## 开发
```
# 克隆项目
git clone https://github.com/luoyusoft/luoyu-blog-frontend.git

# 进入项目目录
cd luoyu-blog-frontend

# 安装依赖
npm install

# 启动服务
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

浏览器访问 http://localhost:8002

## 发布
```
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
