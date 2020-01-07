const Koa = require('koa')
const next = require('next')
const open = require("open");
const path = require('path');
const fs = require('fs');
const https = require('https');



const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa();
    // SSL options
    // const credentials = {
    //     key: fs.readFileSync(path.join(__dirname, '../../ssl/test.cn+2-key.pem')),  //私钥
    //     cert: fs.readFileSync(path.join(__dirname, '../../ssl/test.cn+2.pem')),  //证书
    // };



    server.use(async (ctx, next) => {
        const { url, req, res, query } = ctx;
        await handle(req, res)
    })


    //HTTP
    server.listen(7999, () => {
        console.log('next 服务==== 端口7999')
    })
    open("http://localhost:7999");

    //HTTPS
    // https.createServer(credentials, server.callback()).listen(7999, () => {
    //     console.log('> next 服务==== 端口7999')
    // });
    // open("https://localhost:7999");
})
