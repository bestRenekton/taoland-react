import { useEffect } from 'react';
import { useRouter } from 'next/router';


// 使用
// useInitHeight();


export function useInitHeight(cb?: any) {
    const router = useRouter();
    useEffect(
        () => {
            // console.log('useInitHeight');
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            cb && cb();
        },
        [router.query.id],
    );
}
