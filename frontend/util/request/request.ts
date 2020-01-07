import fetchFoo from './requestFetch';
import axiosFoo from './requestAxios';
import fetchNodeFoo from './requestFetchNode';
import { IRequestOpt } from '@/interface/app';


export function request(opt: IRequestOpt) {

    if (opt.node) {//服务端用isomorphic-unfetch
        return fetchNodeFoo(opt);
    } else {
        if (window.fetch) {
            return fetchFoo(opt);
        } else {
            return axiosFoo(opt);
        }
    }
}
