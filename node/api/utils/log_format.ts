const log4js = require('log4js');
import { LOG_CONFIG } from '../constant'//加载配置文件


let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');

log4js.configure(LOG_CONFIG);



//格式化响应日志
const formatRes = (ctx, resTime) => {
    let responserLog = formatReqLog(ctx.request, resTime); // 添加请求日志
    responserLog.push(`response status: ${ctx.status}`); // 响应状态码
    responserLog.push(`response body: \n${JSON.stringify(ctx.body)}`); // 响应内容
    responserLog.push(`------------------------ end\n`); // 响应日志结束
    return responserLog.join("\n");
};

//格式化错误日志
const formatError = (ctx, err, resTime) => {
    let errorLog = formatReqLog(ctx.request, resTime); // 添加请求日志
    errorLog.push(`err name: ${err.name}`); // 错误名称
    errorLog.push(`err message: ${err.message}`); // 错误信息
    errorLog.push(`err stack: ${err.stack}`); // 错误详情
    errorLog.push(`------------------------ end\n`); // 错误信息结束
    return errorLog.join("\n");
};

// 格式化请求日志
const formatReqLog = (req, resTime) => {
    let method = req.method;
    // 访问方法 请求原始地址 客户端ip
    let formatLog = [`\n------------------------ ${method} ${req.originalUrl}`, `request client ip: ${req.ip}`];

    if (method === 'GET') { // 请求参数
        formatLog.push(`request query: ${JSON.stringify(req.query)}\n`)
    } else {
        formatLog.push(`request body: ${JSON.stringify(req.body)}\n`)
    }

    formatLog.push(`response time: ${resTime}`); // 服务器响应时间
    return formatLog;
};


const logFormat = {
    logError: (ctx, error, resTime) => {
        if (ctx && error) {
            errorLogger.error(formatError(ctx, error, resTime));
        }
    },
    logResponse: (ctx, resTime) => {
        if (ctx) {
            resLogger.info(formatRes(ctx, resTime));
        }
    }
};

const logger = async (ctx, next) => {
    const start = Number(new Date());//响应开始时间
    let ms = 0;//响应间隔时间
    try {
        await next();
        ms = Number(new Date()) - start;
        //记录响应日志
        logFormat.logResponse(ctx, ms);

    } catch (error) {
        ms = Number(new Date()) - start;
        //记录异常日志
        logFormat.logError(ctx, error, ms);
    }
}

module.exports = logger;