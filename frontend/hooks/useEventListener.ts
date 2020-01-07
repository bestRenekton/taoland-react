import React, { useEffect } from 'react';


// 使用
// const handler = ({ clientX, clientY }) => {
//     console.log(clientX, clientY);
//     setCoords({ x: clientX, y: clientY });
// };
// useEventListener('click', handler);


interface IUseScrollTop {
    (
        eventName: any,
        hander?: any,
        dom?: any,
    ): void
}

export const useEventListener: IUseScrollTop = (eventName, hander, dom) => {
    useEffect(() => {
        // 不传入dom，则是 window
        // 监听
        if (dom) {
            dom.addEventListener(eventName, hander);
        } else {
            window.addEventListener(eventName, hander);
        }

        return () => {
            // 卸载监听
            if (dom) {
                dom.removeEventListener(eventName, hander);
            } else {
                window.removeEventListener(eventName, hander);
            }
        };
    }, [eventName, hander, dom]);
};
