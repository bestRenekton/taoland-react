const Router = require('koa-router');
import { API_PREFIX } from '../constant';
import { oauth, signIn, checkToken, visitCount } from './sign'
import {
    createArticle, getArticleList, getArticleDetail, delArticle, updateArticle,
    createCategory, getCategory, addImg
} from './article'
import { getComment, createComment, replyComment } from './comment';


const rootRouter = new Router();
rootRouter.prefix(API_PREFIX); // 设置路由前缀





//api
rootRouter.get('/visitCount', visitCount);

rootRouter.get('/oauth/redirect', oauth);
rootRouter.post('/oauth/signIn', signIn);
rootRouter.post('/oauth/checkToken', checkToken);

rootRouter.post('/article/createCategory', createCategory);
rootRouter.get('/article/getCategory', getCategory);

rootRouter.post('/article/createArticle', createArticle);
rootRouter.post('/article/getArticleList', getArticleList);
rootRouter.get('/article/getArticleDetail', getArticleDetail);
rootRouter.post('/article/delArticle', delArticle);
rootRouter.post('/article/updateArticle', updateArticle);
rootRouter.post('/article/addImg', addImg);


rootRouter.get('/comment/getComment', getComment);
rootRouter.post('/comment/createComment', createComment);
rootRouter.post('/comment/replyComment', replyComment);







export { rootRouter }
