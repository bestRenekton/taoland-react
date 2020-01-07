import axios from 'axios';
// import { message } from 'antd';
import qs from 'qs';
import localforage from 'localforage';
import { CODE_MESSAGE, BASE_URL } from '@/constans';
import { IRequestOpt } from '@/interface/app';


// 添加一个请求拦截器
axios.interceptors.request.use(async (config) => {
  // NProgress.start();
  let { method, data } = config;
  const { token, account } = await localforage.getItem('userInfo') || {};
  let commonObj: any = { token };
  commonObj = account ? { ...commonObj, account } : commonObj;
  const lastData = { ...data, ...commonObj };
  // post需要设置headers
  if (method !== 'GET' && method !== 'get') {
    config.data = lastData;
  } else {
    config.url += `?${qs.stringify(lastData)}`;
  }
  // 通用配置
  config.baseURL = BASE_URL;
  config.timeout = 60000;
  config.withCredentials = true; // 后端拿cookie,true的情况下，后端要设置Access-Control-Allow-Origin为你的源地址，例如http://localhost:8080，不能是*，而且还要设置header('Access-Control-Allow-Credentials: true');

  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});
// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // NProgress.done();

  // 抛出服务器异常
  if (response.status < 200 || response.status >= 300) {
    throw { response: { status: response.status, statusText: response.statusText } };
  }
  return response.data;
}, (error) => {
  // NProgress.done();
  return Promise.reject(error);
});


export default function request(opt: IRequestOpt) {
  // @ts-ignore
  return axios(opt)
    .then((response) => {
      // 抛出接口异常
      // if (response.code < 200 || response.code >= 300) {
      //     throw { response: { status: response.code, statusText: response.msg } }
      // }
      console.log(`%c 【${opt.method ? opt.method : 'get'}: ${opt.url}】成功，响应：%o`, 'color: #4CAF50;', response);
      return response;
    })
    .catch((error) => {
      console.error(`【${opt.method ? opt.method : 'get'}: ${opt.url}】失败，响应：%o`, error);
      // 响应时状态码处理
      const status = error.response ? error.response.status ? error.response.status : 500 : 500;
      const errortext = CODE_MESSAGE[status] || error.response.statusText || error.message;
      // alert(errortext)
      return { code: status, msg: errortext, data: { err: errortext } };
    });
}
