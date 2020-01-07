import fetch from 'isomorphic-unfetch';
import qs from 'qs';
import { CODE_MESSAGE, BASE_URL } from '@/constans';
import { IRequestOpt } from '@/interface/app';


export default async function fetchNodeFoo(opt: IRequestOpt) {
    let data: any = {};
    let httpUrl: string = '';

    if (opt.method !== 'GET' && opt.method !== 'get' && opt.method) { // post
        data.method = opt.method;
        data.headers = {
            'Content-Type': 'application/json',
        };
        data.body = JSON.stringify(opt.data);
        httpUrl = `${BASE_URL}${opt.url}`;
    } else { // get
        httpUrl = `${BASE_URL}${opt.url}?${qs.stringify(opt.data)}`;
    }

    try {
        let res = await fetch(httpUrl, data || {});
        // 抛出服务器异常
        if (res.status < 200 || res.status >= 300) {
            throw { response: { status: res.status, statusText: res.statusText } };
        }
        let response = await res.json();
        // 抛出接口异常
        // if (response.code < 200 || response.code >= 300) {
        //     throw { response: { status: response.code, statusText: response.msg } }
        // }
        console.log(`%c 【${opt.method ? opt.method : 'get'}: ${opt.url}】成功，响应：%o`, 'color: #4CAF50;', response);
        return response;
    } catch (error) {
        console.error(`【${opt.method ? opt.method : 'get'}: ${opt.url}】失败，响应：%o`, error);
        // 响应时状态码处理
        const status = error.response ? error.response.status ? error.response.status : 500 : 500;
        const errortext = CODE_MESSAGE[status] || error.response.statusText || error.message;
        return { code: status, msg: errortext, data: {} };
    }
}

