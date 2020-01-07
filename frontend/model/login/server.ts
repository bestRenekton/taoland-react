import { request } from '@/util/index';


export const SignIn = (data: { account: string, password: string }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'oauth/signIn',
        method: 'post',
        data,
    });
};
