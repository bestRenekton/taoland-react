const Koa = require('koa');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const https = require('https');
const fs = require('fs');

const cors = require('./utils/cors');
const logger = require('./utils/log_format');
import { rootRouter } from './routers'






const app = new Koa();
// SSL options
// const credentials = {
//     key: fs.readFileSync(path.join(__dirname, '../ssl/test.cn+2-key.pem')),  //私钥
//     cert: fs.readFileSync(path.join(__dirname, '../ssl/test.cn+2.pem')),  //证书
// };



//静态资源
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 日志
app.use(logger);
//跨域
app.use(cors);
//post
app.use(bodyParser({
    formLimit: '10mb'
}));
//路由
app.use(rootRouter.routes()).use(rootRouter.allowedMethods());



app.listen(8003, () => {
    console.log('> node api 服务==== 端口8003')
});

// https.createServer(credentials, app.callback()).listen(8003, () => {
//     console.log('> node api 服务==== 端口8003')
// });