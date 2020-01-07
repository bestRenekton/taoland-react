import { TOKENKEY, ROUTERLEVEL, PATHFOLDER } from "../constans";
const db = require('../utils/db');

const jwt = require("jsonwebtoken");
const fs = require('fs');//引入文件读取模块
const path = require('path')




/**
 * 格式化返回值
 */
interface IReData {
    (
        data: object,
        code?: number,
        msg?: string
    )
}
export const ReData: IReData = (data, code = 200, msg = "success") => {
    return {
        code,
        msg,
        data
    };
}

/**
 * 统一添加try catch
 */
export const commonTryCatch = (ctx, next, FUN) => {
    return (async (ctx, next, fun) => {
        try {
            await FUN()
        } catch (err) {
            console.log(`接口【${FUN.name}】报错：`, err);
            ctx.response.status = 500;
            throw err
        }
    })(ctx, next, FUN)
}


/**
 * 校验token
 * @param token  token
 * @param account 账号
 */
export const checkTokenFun = (token: string, account: any) => {
    return new Promise((res, rej) => {
        jwt.verify(token, TOKENKEY, function (err, decode) {
            if (err || ('' + decode.account) !== account) {  //  时间失效的/伪造的/别人的/token          
                res(false)
            } else {
                res(true)
            }
        })
    })
}



/**
 * 校验token
 * @param token 
 */
export const isAdminFun = async (token: string, account: any) => {
    const isUser = await checkTokenFun(token, account);
    if (isUser) {
        const USER = db.User;
        const userInfo = await USER.findOne({ account });
        if (userInfo.level === ROUTERLEVEL.ADMIN) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * 判断文件是否存在
 * @param path 路径
 */
export const isFileExisted = (path: string) => {
    return new Promise(function (resolve, reject) {
        fs.access(path, (err) => {
            if (err) {
                resolve(false)
            } else {
                resolve(true);
            }
        })
    })
}



/**
 * 保存base64图片为本地文件
 * @param img base64
 * @param FolderName  保存的文件夹名
 * return 返回相对路径地址
 */
export const SaveImg = async (img: string, FolderName: string) => {
    return new Promise(async (res, rej) => {
        const timeStamp = Date.now();
        // const pathFolder = path.join(__dirname, `../../../frontend/public/img/${FolderName}`);
        const pathFolder = path.join(__dirname, `${PATHFOLDER}${FolderName}`);
        const pathImg = `${pathFolder}/${timeStamp}.png`;
        const base64 = img.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
        const exist = await isFileExisted(pathFolder);

        if (!exist) {
            await new Promise((res, rej) => {
                fs.mkdir(pathFolder, { recursive: true }, () => {
                    console.log(`创建${pathFolder}成功`);
                    res()
                });
            })
        }
        await fs.writeFile(pathImg, dataBuffer, function (err) {//用fs写入文件
            if (err) {
                console.log(err);
            } else {
                console.log(`写入成功！${pathImg}`);
                res(`img/${FolderName}/${timeStamp}.png`)
            }
        })
    })
}