import { red } from '@material-ui/core/colors';
import { IROUTER_TABLE } from '@/interface/app';

//是否是生产环境，用于屏蔽console
export const ISPRODUCTION = false;
//根地址
export const BASE = "http://localhost:8003/";
// export const BASE = 'http://137.48.1.1:8003/';


//请求地址
export const BASE_URL = `${BASE}api/`;
// github登录配置
export const GITHUB_OAUTH_BASE_URL = 'https://github.com/login/oauth/authorize';
export const GITHUB_OAUTH_CLIENT_ID = 'cb20c18961978338c943';
export const GITHUB_OAUTH_CALLBACK_URL = `${BASE_URL}oauth/redirect`;
export const GITHUB_OAUTH_URL = `${GITHUB_OAUTH_BASE_URL}?client_id=${GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${GITHUB_OAUTH_CALLBACK_URL}`;


// 设备
export enum DEVICE { PC, MOBILE }

// 路由级别
export enum ROUTERLEVEL { VISITOR = 1, LOGIN = 2, ADMIN = 3 }

// 默认userInfo
export const DEFAULTUSERINFO = {
    account: '',
    token: '',
    name: '游客',
    avatar: '/img/avatar.png',
    level: ROUTERLEVEL.VISITOR,
};
// 默认SEO
export const DEFAULTSEO = {
    keywords: '前端博客,taoland,react,node',
    description: 'TaoLand - yangyuetao.cn - 一个交流前端技术的卡卡角角',
    documentTitle: 'TaoLand - yangyuetao.cn - 一个交流前端技术的卡卡角角',
};
// 路由表
export const ROUTER_TABLE: Array<IROUTER_TABLE> = [
    {
        pathname: '/',
        navBtn: 'HOME',
        level: ROUTERLEVEL.VISITOR,
    },
    {
        pathname: '/articleDetail',
        documentTitle: '文章详情 - TaoLand',
        navBtn: '',
        level: ROUTERLEVEL.VISITOR,
        specialSEO: true,
    },
    {
        pathname: '/category',
        documentTitle: '归档 - TaoLand',
        navBtn: 'CATEGORY',
        level: ROUTERLEVEL.VISITOR,
    },
    {
        pathname: '/about',
        documentTitle: '关于 - TaoLand',
        navBtn: 'ABOUT',
        level: ROUTERLEVEL.VISITOR,
    },
    {
        pathname: '/admin/login',
        documentTitle: '登录 - TaoLand',
        navBtn: '',
        level: ROUTERLEVEL.VISITOR,
        noHeader: true,
        noFooter: true,
    },
    {
        pathname: '/admin/adminHome',
        documentTitle: '管理文章 - TaoLand',
        navBtn: '',
        level: ROUTERLEVEL.ADMIN,
    },
];

// 状态码错误信息
export const CODE_MESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    408: '请求超时',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};


// 主题
export const THEME = { dark: "dark", light: "light" };
//主题配置
export let THEMECONFIG = {
    [THEME.dark]: {
        palette: {
            primary: { main: '#000' },
            secondary: { main: '#fff' },
            error: {
                main: red.A400,
            },
            type: 'dark',
            background: {
                default: '#000',
            },
        },
        typography: {
            fontSize: 16,
        },
        overrides: { // 全局样式
            MuiSkeleton: {
                root: {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                },

            },
        },
    },
    [THEME.light]: {
        palette: {
            // primary: { main: '#fff' },
            secondary: { main: '#000' },
            error: {
                main: red.A400,
            },
            type: 'light',
            // background: {
            //     default: '#000',
            // },
        },
        typography: {
            fontSize: 16,
        },
        overrides: { // 全局样式
            MuiSkeleton: {
                root: {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                },

            },
        },
    },
};
