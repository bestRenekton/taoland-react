var http = require('http')
var createHandler = require('node-github-webhook')
// var handler = createHandler([ // 多个仓库
//     {
//         path: '/deploy-app1',
//         secret: 'CUSTOM'
//     },
//     {
//         path: '/deploy-app2',
//         secret: 'CUSTOM'
//     }
// ])
var handler = createHandler({ path: '/deploy-taoland', secret: 'secret1' }) // 单个仓库

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8004)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log(
        'Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref
    )
    if (event.payload.ref !== 'refs/heads/master') {//只部署master的提交
        return
    }
    switch (event.path) {
        case '/deploy-taoland':
            runCmd('sh', ['./deploy-taoland.sh', event.payload.repository.name], function (text) { console.log(text) })
            break
        case '/app2':
            runCmd('sh', ['./app2_deploy.sh', event.payload.repository.name], function (text) { console.log(text) })
            break
        default:
            // 处理其他
            break
    }
})

function runCmd(cmd, args, callback) {
    var spawn = require('child_process').spawn
    var child = spawn(cmd, args)
    var resp = ''
    child.stdout.on('data', function (buffer) {
        resp += buffer.toString()
    })
    child.stdout.on('end', function () {
        callback(resp)
    })
}
