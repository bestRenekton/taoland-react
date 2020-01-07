import axios from 'axios'
import { clientID, clientSecret, TOKENKEY, ROUTERLEVEL, BASE } from '../constans'
import { ReData, isAdminFun, commonTryCatch } from '../utils/common'
const jwt = require("jsonwebtoken");
const db = require('../utils/db');







//github登录授权
export const oauth = async (ctx, next) => {
    const code = ctx.request.query.code;
    console.log('github code:', code);

    //用code换取token
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `code=${code}`,
        headers: {
            accept: 'application/json'
        }
    });
    const accessToken = tokenResponse.data.access_token;
    console.log(`github token: ${accessToken}`);

    //用token换取info
    const githubInfoResponse = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`,
        }
    })
    const githubInfo = githubInfoResponse.data;
    // console.log(`github info: ${JSON.stringify(githubInfo)}`);
    const { name, id: account, avatar_url } = githubInfo;//使用id作为account

    //保存头像到本地
    // const timeStamp = Date.now();
    // const pathImg = path.join(__dirname, `../../../frontend/public/img/user/${timeStamp}.png`);
    // request({ url: avatar_url })
    //     .on('error', function (err) {
    //         console.log('请求失败', err)
    //     })
    //     .pipe(
    //         fs.createWriteStream(pathImg).on('close', err => {
    //             console.log('保存结束', err)
    //         })
    //     )

    //保存用户信息
    const USER = db.User;
    const hasUser = await USER.findOne({ account });
    if (hasUser) {//更新
        hasUser.name = name;
        hasUser.avatar = avatar_url;
        hasUser.githubInfo = githubInfo;
        await USER(hasUser).save();
    } else {//第一次新建
        await USER.create({
            account,
            name,
            level: ROUTERLEVEL.LOGIN,
            // avatar: `/img/user/${timeStamp}.png`,
            avatar: avatar_url,
            githubInfo
        })
    }
    const token = jwt.sign({ account }, TOKENKEY, { expiresIn: '24h' });
    const userInfo = await USER.findOne({ account });
    ctx.response.redirect(`${BASE}/admin/login?account=${account}&name=${name}&avatar=${userInfo["avatar"]}&level=${userInfo["level"]}&token=${token}`);
};

//管理员登录
export const signIn = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function signIn() {
        const { account, password } = ctx.request.body;
        const USER = db.User;
        const hasAdmin = await USER.findOne({ level: ROUTERLEVEL.ADMIN });

        if (hasAdmin) {//登录
            if (account !== hasAdmin.account || password !== hasAdmin.password) {
                ctx.body = ReData({ err: "账号密码错误" });
                return
            }
        } else {//第一次，新建管理员
            await USER.create({
                account,
                password,
                name: "theTao",
                level: ROUTERLEVEL.ADMIN,
                avatar: '/img/user/admin.png',
            })
        }

        const adminInfo = await USER.findOne({ account, password });
        const { name, avatar, level } = adminInfo;
        const token = jwt.sign({ account }, TOKENKEY, { expiresIn: '24h' });

        ctx.body = ReData({ name, avatar, level, token, account });
    })
}
//校验token
export const checkToken = async (ctx, next) => {
    const { token, account } = ctx.request.body;
    const isAdmin = await isAdminFun(token, account);

    if (isAdmin) {
        ctx.body = ReData({ msg: "身份验证通过" });
    } else {
        ctx.body = ReData({ err: "非法用户" });
    }
}
//访问统计
export const visitCount = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function visitCount() {
        let VISIT = db.Visit;
        let visitData = await VISIT.find();
        if (visitData.length > 0) {
            let current = visitData[0];
            current.view = current.view + 1;
            await VISIT(current).save();
            ctx.body = ReData({ view: current.view })
        } else {//新增
            await VISIT.create({ view: 1 });
            ctx.body = ReData({ view: 1 })
        }
    })
}

