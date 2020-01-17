# taoland-react

<p align="center">
  <img src="https://raw.githubusercontent.com/bestRenekton/taoland-react/master/frontend/public/img/taoland.png"/>
  <br>English | <a href="README.md">中文</a>
  <br><strong>taoland-react</strong> a blog powered by TypeScript,React,Koa.
</p>

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

## Introduction

[taoland-vue](https://github.com/bestRenekton/taoLand) powered by Vue and Express.And in 2020, typescript, react and koa are used to reconstruct the front and back ends,support SSR and PWA, and the UI is generally simpler and darker...



## Preview

Online preview：[xxx](https://xxx)

source code：[https://github.com/bestRenekton/taoland-react](https://github.com/bestRenekton/taoland-react)

## Features

Implemented functions：

- [x] GitHub three party registration and login
- [x] Blog management (add, delete, change and check)
- [x] Picture upload
- [x] Label classification
- [x] Comment function
- [x] Server Side Render
- [x] PWA
- [x] Automated Deployment

## ⚙️ Technology

Main technologies used:

+ The front end uses typescript, react, hooks, Redux, Saga technology stack, without using DVA
+ The next selected by the framework implements the material UI for SSR and UI
+ Back end uses node,Koa for frame
+ Mongodb is adopted for database
+ PWA offline settings configured,Use with HTTPS
+ Using docker and webhooks for automatic deployment


## 🚀 Start

```shell
# clone with Git Bash
git clone https://github.com/bestRenekton/taoland-react.git

# change directory
cd taoland-react

# Make sure the global is installed npm-run-all cross-env del-cli
cnpm i npm-run-all cross-env del-cli -g

# install dependencies
npm i

# Local mongdb starts well
modify Database configuration in `/taoland-react/node/api/constant/index.ts`

# front-end-serve with hot reload at localhost:7999
# back-end-serve with hot reload at localhost:8003
npm run dev
```

## ✨ Deploy

<details open=“open”>
  <summary>Expand / collapse</summary> 
  <br/>

+ Port specification
    + 7999 next server
    + 8000 nginx http
    + 8001 nginx https
    + 8002 mongodb
    + 8003 node
+ Modify front end configuration：`/frontend/constant/index.ts`
    + `ISPRODUCTION`if true，Shield console
    + `BASE_URL`Request address for your own node service
    + GitHub login configuration
+ Modify backend configuration:`/node/api/constant/index.ts`
    + host `BASE`
    + Database configuration`DB_URL`,`DB_ACCOUNT`,`DB_PASSWORD`
    + Cross domain white list configuration`VALID_ORIGINS`
    + GitHub login configuration
    + Token key
+ Modify nginx configuration `/nginx/taoland.conf`
    + Proxy address`proxy_pass http://137.48.1.1:7999;`
+ Modify docker configuration`docker-compose.yml`
    + Mongodb account password`MONGO_INITDB_ROOT_USERNAME`,`MONGO_INITDB_ROOT_PASSWORD`
+ If you need HTTPS
    + Need to change your SSL certificate and secret key
    + Modify node to HTTPS to start
+ Server installation docker
+ Project server
+ Enter project root
+ `docker-compose up -d`Start all containers
+ Wait a few minutes, because the next container will package and start the server-side rendering
+ Then go to port 8000. If there is no problem, you should see the home page
##### If wrong
+ `docker-compose down`Delete all containers that just started
+ `docker images`View the image,`docker rmi  xxxxx`Delete the corresponding image`taoland-react_next`和`taoland-react_node`
+ `docker-compose up`Start all containers and check the internal startup process to find out the cause of the error
##### webhooks
+ Project root ` NPM run docker webhooks`
+ Enter your own GitHub warehouse, setting > webhook, add a listening rule, and you can deploy it automatically every time you push
</details> 

##  💼 Formation

<details open=“open”>
  <summary>Expand / collapse</summary> 
  <br/>

```shell
     ┌── frontend            Front-end code
     ├── nginx               Configuration of nginx
     ├── node                Backend code
     ├── ssl                 HTTPS certificate
src──├── webhooks            Automated deployment settings
     ├── docker-compose.yml  Docker configuration
     ├── Dockerfile-next     Front end next container
     ├── Dockerfile-node     Backend node container
     ├── volumes             Data storage after docker is used will automatically synchronize back-end logs, database data, uploaded pictures, etc
     └── html                Generally not used. If you use next to export statically, you can put it here
```
</details> 

##  🎓 Detailed command
<details open=“open”>
  <summary>Expand / collapse</summary> 
  <br/>

+ `dev` Start the front and rear ends at the same time
    + `dev:client`Boot front end
    + `dev:server`Boot rear end
+ `build` Back end before packaging
    + `build:client`Baling front end
    + `build:server`Package backend TS = > JS
+ `start` At the same time, start the packaged code at the front and back ends
    + `start:client`Front end
    + `start:server`back-end
+ Docker correlation
    + `docker-next-start`Docker start next container
    + `docker-node-start`Docker start node container
+ `export` Export the front-end code as static output and package the back-end code
    + `export:client`Export the front-end code as static output
    + `export:server`Package backend TS=>JS
+ `new`Quickly and automatically generate component files for development
+ `lint`code detection
</details> 

## 💜 Thank
<a href="https://github.com/chun5398" target="_blank">
  <img src="https://avatars0.githubusercontent.com/u/30543796?s=40&v=4">
</a>

## :memo: License

[MIT](https://github.com/bestRenekton/taoland-react/blob/master/LICENSE)

Copyright (c) 2020 bestRenekton


