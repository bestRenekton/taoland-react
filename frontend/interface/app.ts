export interface IUserInfo {
    account: any,
    token: string,
    name: string,
    avatar: string,
    level: number
}

export interface IROUTER_TABLE {
    pathname: string,
    documentTitle?: string,
    navBtn: string,
    level: number,
    keywords?: string,
    description?: string,
    specialSEO?: boolean,
    noHeader?: boolean,
    noFooter?: boolean,
}

export interface IAppReducer {
    device: number,
    userInfo: IUserInfo,
    theme: string,
    pageProgressStart: () => void,
    pageProgressEnd: () => void,

}
export interface IReducerAction {
    type: string,
    payload: { [key: string]: any }
}

export interface IRequestOpt {
    node?: boolean, // 服务端使用isomorphic-unfetch,客户端fetch或者axios
    url: string,
    method?: string,
    data?: object,
    [key: string]: any
}
