# taoland-react

#### 介绍
+ 老站为vue,express,[地址](https://github.com/bestRenekton/taoLand)
+ [本项目](https://github.com/bestRenekton/taoland-react)为2020年用TypeScript,React,Koa重构了前后端,支持SSR,PWA了,UI总的来说更简洁,暗黑了...
    + 实现了用户Github三方注册、登录、检测登录、博客管理（增删改查）、图片上传、标签分类等功能。
    + 前端使用TypeScript,React,Hooks,Redux,Saga技术栈,没用dva
    + 框架选的Next,实现了SSR,UI用的MaterialUI
    + 后端使用Node,框架用的Koa
    + 数据库采用MongoDB
    + 配置了PWA离线设置,使用需配合https
    + 使用Docker来进行部署
  
#### 目录
+ frontend=== 前端代码
+ nginx===nginx的配置
+ node===后端代码
+ ssl===https证书
+ docker-compose.yml===docker配置
+ Dockerfile-next===前端next容器
+ Dockerfile-node===后端node容器
+ volumes===使用docker后的数据存放，里面会自动同步后端的日志，数据库数据，上传图片等
+ html=== 一般未使用，如果使用next静态导出export后，可以放于此处


#### 本地快速开始
1.  全局安装`cnpm`or `npm i npm-run-all cross-env del-cli -g`
2.  本地mongDB启动好，修改`/taoland-react/node/api/constans/index.ts`中的数据库配置
3.  运行`npm run dev`启动前端和后端，如果数据库不对，后端会报错

#### 命令详解
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


#### 部署服务器
+ 端口说明
    + 7999 next服务
    + 8000 nginx http
    + 8001 nginx https
    + 8002 mongodb
    + 8003 node
+ 修改前端配置：`/frontend/constans/index.ts`
    + `ISPRODUCTION`设置为true，屏蔽console
    + `BASE_URL`为自己node服务的请求地址
    + github登录配置
+ 修改后端配置：`/node/api/constans/index.ts`
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
#### 注意
+ 如果是win系统，修改`docker-compose.yml`
    + 屏蔽` volumes: - ./volumes/mongodb/data/db:/data/db`,否则mongodb起不起来
+ PWA前提是https


