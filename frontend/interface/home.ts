
// home reducer
export interface IHomeReducer {
    articleList: IArticleList
}
// 文章列表
export interface IArticleList {
    loading?: boolean,
    data?: Array<IArticleItem>,
    more?: boolean,
    page?: number,
    row?: number
}
export interface IArticleItem {
    category: Array<string>,
    comments: number,
    date: string,
    gist: string,
    looked: number,
    level: number,
    title: string,
    previewImg: string,
    _id: string
}


// 文章详情
export interface IArticleDetailItem {
    category: Array<string>,
    comments: number,
    looked: number,
    content: string,
    date: string,
    gist: string,
    title: string,
    next: { title: string, _id: string, previewImg: string },
    prev: { title: string, _id: string, previewImg: string },
    _id: string,
}

// 文章评论
export interface Icomments {
    _id: string,
    articleId: string,
    fromName: string,
    fromAvatar: string,
    fromLevel: number,
    date: number,
    content: string,
    child?: Array<IcommentsChild>,
}
// 评论的回复
export interface IcommentsChild {
    fromName: string,
    fromAvatar: string,
    fromLevel: number,
    toName: string
    date: number
    content: string
}
