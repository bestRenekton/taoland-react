// import { message } from 'antd';
import qs from 'qs';
import localforage from 'localforage';
import { CODE_MESSAGE, BASE_URL } from '@/constant';
import { IRequestOpt } from '@/interface/app';


function parseText(response) {
  return response.text();
}
function parseJSON(text) {
  // return response.json();
  // NProgress.done();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw { response: { status: response.status, statusText: response.statusText } };
}


/**
 * 定义新的fetch方法，封装原有的fetch方法
 * @param input
 * @param opts
 */
function timeOutFetch(input, opts) {
  let fetchPromise = fetch(input, opts);
  let timeoutPromise = new Promise(((resolve, reject) => {
    setTimeout(() => {
      reject({ response: { status: 408 } });
    }, opts.timeOut ? opts.timeOut : 30000);
  }));
  return Promise.race([fetchPromise, timeoutPromise]);// ])
}

export default async function request(options: IRequestOpt) {
  // NProgress.start();
  let httpUrl = BASE_URL + options.url;
  const { token, account } = await localforage.getItem('userInfo') || {};
  let body: any = { ...options.data, token };
  body = account ? { ...body, account } : body;
  // post需要设置headers
  if (options.method !== 'GET' && options.method !== 'get' && options.method) {
    options.headers = {
      Accept: 'application/json,text/plain,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'Content-Type': 'application/json; charset=UTF-8',
      // 'Access-Control-Allow-Credentials': 'https://v1.hitokoto.cn/',
      // 'Authorization':"BearerBVyA1xiRWaKpKVua814DHIMnc9wvyh5p9oHc8BJVmZwuj40wGB"
    };
    options.body = qs.stringify(body);
  } else {
    httpUrl += `?${qs.stringify(body)}`;
  }
  // 通用配置
  options.mode = 'cors';// no-cors, cors, *same-origin
  options.credentials = 'include';// omit：默认，不cookie；include:跨域cookie；same-origin：同域cookie；
  options.cache = 'default';// *default, no-cache, reload, force-cache, only-if-cached
  // options.redirect= "follow"; // manual, *follow, error
  // options.referrer= "no-referrer"; // no-referrer, *client
  options.timeOut = 60000;

  return timeOutFetch(httpUrl, options)
    .then(checkStatus)
    .then(parseText)
    .then(parseJSON)
    .then((response) => {
      // 抛出接口异常
      if (response.code < 200 || response.code >= 300) {
        throw { response: { status: response.code, statusText: response.msg } };
      }
      console.log(`%c 【${options.method ? options.method : 'get'}: ${options.url}】成功，响应：%o`, 'color: #4CAF50;', response);
      return response;
    })
    .catch((error) => {
      console.error(`【${options.method ? options.method : 'get'}: ${options.url}】失败，响应：%o`, error);
      // 响应时状态码处理
      const status = error.response ? error.response.status ? error.response.status : 500 : 500;
      const errortext = CODE_MESSAGE[status] || error.response.statusText || error.message;
      // alert(errortext)
      return { code: status, msg: errortext, data: { err: errortext } };
    });
}
