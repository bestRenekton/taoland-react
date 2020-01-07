import { Tween } from '@/util/tween';


// 调用
// let top = document.documentElement.scrollTop || document.body.scrollTop;
// useAnimation(top, 0, 500, 'Quint.easeOut', 0, function (e) {
//     document.documentElement.scrollTop = e;
//     document.body.scrollTop = e;
// });


export const useAnimation = (
    from: number, // 起始值
    to: number, // 结束值
    duration: number, // 持续时间
    easing: string = 'Linear', // 运动曲线
    delay: number = 0, // 延迟
    callback?: (value: number) => void, // 回调
) => {
    setTimeout(() => {
        // 开始帧数
        let start = 0;
        // 需要总帧数
        const during = Math.ceil(duration / 17);// 一般浏览器是每秒60帧,即1000/60~=17
        // 获取变化函数
        let arrKeyTween = easing.split('.');
        let fnGetValue;
        if (arrKeyTween.length === 1) {
            fnGetValue = Tween[arrKeyTween[0]];
        } else if (arrKeyTween.length === 2) {
            fnGetValue = Tween[arrKeyTween[0]] && Tween[arrKeyTween[0]][arrKeyTween[1]];
        }

        const step = function () {
            // 当前的运动位置
            let newValue = fnGetValue(start, from, to - from, during);
            callback && callback(newValue);

            // 时间递增
            start++;
            // 如果还没有运动到位，继续
            if (start <= during) {
                requestAnimationFrame(step);
            }
        };
        // 开始执行动画
        step();
    }, delay);
};
