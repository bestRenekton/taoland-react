# taoland-react

<p align="center">
  <img src="https://raw.githubusercontent.com/bestRenekton/taoland-react/master/frontend/public/img/taoland.png"/>
  <br>中文 | <a href="README_en.md">English</a>
  <br><strong>taoland-react</strong> 一个使用TypeScript,React,Koa构建的博客。
</p>
<div align="center">

[![react](https://img.shields.io/badge/react-v16.12.0-0074D9)](https://reactjs.org/)
[![redux](https://img.shields.io/badge/redux-v4.0.5-7FDBFF)](https://redux.js.org/)
[![redux-saga](https://img.shields.io/badge/redux--saga-v1.1.3-2ECC40)](https://redux-saga.js.org/)
[![material-ui](https://img.shields.io/badge/%40material--ui-v4.8.2-FF851B)](https://github.com/mui-org/material-ui)
[![next](https://img.shields.io/badge/next-v9.1.6-FF4136)](https://nextjs.org/)
[![koa](https://img.shields.io/badge/koa-v2.11.0-B10DC9)](https://koajs.com/)
[![typescript](https://img.shields.io/badge/typescript-v3.7.4-85144B)](https://www.typescriptlang.org/)
[![David](https://img.shields.io/david/bestRenekton/taoland-react.svg)](https://david-dm.org/bestRenekton/taoland-react)
[![DevDependencies](https://img.shields.io/david/dev/bestRenekton/taoland-react.svg)](https://david-dm.org/bestRenekton/taoland-react?type=dev)
[![License](https://img.shields.io/npm/l/@loadable/component.svg)](https://github.com/bestRenekton/taoland-react/blob/master/LICENSE)

</div>


## 简介

[老站](https://github.com/bestRenekton/taoLand)为Vue+Express,2020年用TypeScript,React,Koa重构了前后端,支持SSR,PWA了,UI总的来说更简洁,暗黑了...


## 预览

在线预览：[xxx](https://xxx)

源代码：[https://github.com/bestRenekton/taoland-react](https://github.com/bestRenekton/taoland-react)

## 特性

已实现的功能：

- [x] Github三方注册、登录
- [x] 博客管理（增删改查）
- [x] 图片上传
- [x] 标签分类
- [x] 评论功能
- [x] 服务端渲染
- [x] PWA
- [x] 自动化部署

## ⚙️ 技术栈

主要用到的技术：

+ 前端使用TypeScript,React,Hooks,Redux,Saga技术栈,没用dva
+ 框架选的Next,实现了SSR,UI用的MaterialUI
+ 后端使用Node,框架用的Koa
+ 数据库采用MongoDB
+ 配置了PWA离线设置,使用需配合https
+ 使用Docker，webhooks来进行自动部署


## 🚀 快速开始

```shell
# clone本项目
git clone https://github.com/bestRenekton/taoland-react.git

# 进入项目
cd taoland-react

# 确保全局已经安装了npm-run-all cross-env del-cli
cnpm i npm-run-all cross-env del-cli -g

# 安装依赖
npm i

# 本地mongDB启动好
修改`/taoland-react/node/api/constant/index.ts`中的数据库配置

# 启动前端和后端，如果数据库不对，后端会报错,
# 前端启动于7999，后端8003
npm run dev
```

## ✨ 部署

<details open=“open”>
  <summary>展开/收起</summary> 
  <br/>

+ 端口说明
    + 7999 next服务
    + 8000 nginx http
    + 8001 nginx https
    + 8002 mongodb
    + 8003 node
+ 修改前端配置：`/frontend/constant/index.ts`
    + `ISPRODUCTION`设置为true，屏蔽console
    + `BASE_URL`为自己node服务的请求地址
    + github登录配置
+ 修改后端配置：`/node/api/constant/index.ts`
    + host路径`BASE`
    + 数据库配置`DB_URL`,`DB_ACCOUNT`,`DB_PASSWORD`
    + 跨域白名单配置`VALID_ORIGINS`
    + github登录配置
    + token秘钥TOKENKEY
+ 修改nginx配置 `/nginx/taoland.conf`
    + 代理地址`proxy_pass http://137.48.1.1:7999;`为自己的
+ 修改docker配置`docker-compose.yml`
    + mongoDB账号密码`MONGO_INITDB_ROOT_USERNAME`,`MONGO_INITDB_ROOT_PASSWORD`
+ 如果需要上https
    + 需要更换自己的ssl证书和秘钥
    + node修改为https启动
+ 服务器安装docker
+ 项目放服务器
+ 进入项目根目录
+ `docker-compose up -d`启动所有容器
+ 等个几分钟，因为next容器会打包并启动服务端渲染
+ 然后进入8000端口，如果没问题应该就看到首页啦
##### 如果报错了
+ 那就`docker-compose down`删除刚刚启动的所有容器
+ 然后`docker images`查看镜像，`docker rmi  xxxxx`删除对应的镜像`taoland-react_next`和`taoland-react_node`
+ `docker-compose up`启动所有容器，并查看内部启动过程找出错误原因
##### 使用webhooks监听仓库提交，自动部署
+ 项目根目录`npm run docker-webhooks`
+ 进入自己github仓库,setting > webhook,新增一个监听规则，以后每次push就可以自动部署了
</details> 

##  目录结构

<details open=“open”>
  <summary>展开/收起</summary> 
  <br/>

```shell
     ┌── frontend            前端代码
     ├── nginx               nginx的配置
     ├── node                后端代码
     ├── ssl                 https证书
src──├── webhooks            自动化部署设置
     ├── docker-compose.yml  docker配置
     ├── Dockerfile-next     前端next容器
     ├── Dockerfile-node     后端node容器
     ├── volumes             使用docker后的数据存放，里面会自动同步后端的日志，数据库数据，上传图片等
     └── html                一般未使用，如果使用next静态导出export后，可以放于此处
```
</details> 

##  命令详解

<details open=“open”>
  <summary>展开/收起</summary> 
  <br/>

+ `dev` 同时启动前后端
    + `dev:client`启动前端
    + `dev:server`启动后端
+ `build` 打包前后端
    + `build:client`打包前端
    + `build:server`打包后端ts=>js
+ `start` 同时启动前后端打包后的代码
    + `start:client`前端
    + `start:server`后端
+ docker相关
    + `docker-next-start`docker启动next容器
    + `docker-node-start`docker启动node容器
+ `export` 导出前端代码为静态输出，打包后端代码
    + `export:client`导出前端代码为静态输出
    + `export:server`打包后端ts=>js
+ `new`用于开发时候，快速自动生成组件文件
+ `lint`代码检测
</details> 

## 💜 感谢

<a href="https://github.com/chun5398" target="_blank">
  <img src="https://avatars0.githubusercontent.com/u/30543796?s=40&v=4">
</a>

## :memo: 声明

[MIT](https://github.com/bestRenekton/taoland-react/blob/master/LICENSE)

Copyright (c) 2020 bestRenekton


