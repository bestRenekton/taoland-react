import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ROUTER_TABLE } from '@/constans';
import { RootState } from '@/model/rootReducer';
import { IAppReducer } from '@/interface/app';


// 使用
// const RouterLevel = useRouterLevel();
// <RouterLevel>
//     .....
// </RouterLevel>

export const useRouterLevel = () => {
    return (props) => {
        const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
        const router = useRouter();
        const current = ROUTER_TABLE.filter((e) => e.pathname === router.pathname);
        const errRouter = current.length > 0 && current[0].level && app.userInfo.level < current[0].level;

        return errRouter
            ? <div>没有权限</div>
            : props.children;
    };
};
