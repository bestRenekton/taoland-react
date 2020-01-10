import { DB_ACCOUNT, DB_PASSWORD, DB_URL } from "../constant";

const mongoose = require('mongoose');
// mongoose.connect('mongodb://root1:root2@localhost:8002', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(`mongodb://${DB_ACCOUNT}:${DB_PASSWORD}@${DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });



// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));


/************** 定义模式Schema **************/
//visit
const visitSchema = new mongoose.Schema({
    view: Number
})
//user
const userSchema = new mongoose.Schema({
    account: String,
    password: String,
    name: String,
    level: Number,//VISITOR = 1, LOGIN = 2, ADMIN = 3
    avatar: String,
    githubInfo: Object,
})
//分类
const categorySchema = new mongoose.Schema({
    list: Array
})
//文章
const articleSchema = new mongoose.Schema({
    title: String,
    previewImg: String,
    category: Array,
    gist: String,
    content: String,
    date: String,
    comments: Number,
    looked: Number,
    level: Number,
})
//评论
const commentSchema = new mongoose.Schema({
    articleId: String,
    fromName: String,
    fromAvatar: String,
    fromLevel: Number,
    date: Number,
    content: String,
    child: Array,
})


/************** 定义模型Model **************/
const Models = {
    User: mongoose.model('User', userSchema),
    Visit: mongoose.model('Visit', visitSchema),
    Category: mongoose.model('Category', categorySchema),
    Article: mongoose.model('Article', articleSchema),
    Comment: mongoose.model('Comment', commentSchema),
}

module.exports = Models;