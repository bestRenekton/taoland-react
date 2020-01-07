import { IArticleList } from './home';

// admin reducer
export interface IAdminReducer {
    article: IArticleList
    demo: IArticleList
}


export interface IarticleInformation {
    title: String,
    date?: String,
    level: number,
    previewImg: string,
    category: Array<string>,
    gist: String,
    content: String,
    comments?: [],
    _id?: string
}
