//host
// export const BASE = "http://localhost:7999";
export const BASE = "http://49.235.78.129:8000";

//数据库
// export const DB_URL = "localhost:8002";
export const DB_URL = "49.235.78.129:8002";
export const DB_ACCOUNT = "root1";
export const DB_PASSWORD = "root2";

//跨域白名单
export const VALID_ORIGINS = [
    'http://localhost:7999',
    'http://localhost:8000',
    'https://localhost:7999',
    'https://localhost:8000',
    'http://49.235.78.129:7999',
    'http://49.235.78.129:8000',
]

//github三方登录
export const clientID = 'cb20c18961978338c943'
export const clientSecret = '4793ed0db3df93a3453b20866b72a6420dd23f35'

//token加密的key
export const TOKENKEY = "WERSADFXVASDF";


//图片保存路径
export const PATHFOLDER = "../../upload/img/";


//api前缀
export const API_PREFIX = '/api';

// 路由级别
export const ROUTERLEVEL = { VISITOR: 1, LOGIN: 2, ADMIN: 3 };

//log格式
export const LOG_CONFIG = {
    "appenders": {
        error: {
            "category": "errorLogger", //logger名称
            "type": "dateFile", //日志类型
            "filename": 'logs/error/error', //日志输出位置
            "alwaysIncludePattern": true, //是否总是有后缀名
            "pattern": "-yyyy-MM-dd.log" //后缀，每天创建一个新的日志文件
        },
        response: {
            "category": "resLogger",
            "type": "dateFile",
            "filename": 'logs/response/response',
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    "categories": {
        error: {
            appenders: ['error'],
            level: 'error'
        },
        response: {
            appenders: ['response'],
            level: 'info'
        },
        default: {
            appenders: ['response'],
            level: 'info'
        }
    }
};