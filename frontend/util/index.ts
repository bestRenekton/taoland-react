import { ISPRODUCTION } from '@/constans';






export { Profiler } from './profiler';// 性能检测
export { request } from './request/request';// 请求
export { modelBuilderPageList } from './modelBuilder/modelBuilderPageList';// 分页类型model
export { deviceJudge } from './deviceJudge';// 判断设备类别
export { createtheme } from './theme';


//存活时间
export const getSurvivalTime = () => {
    let s = new Date('2018-02-06 14:01:23').getTime() / 1000;
    let e = new Date().getTime() / 1000;
    let stamp = e - s;

    const M = 60 * 1;
    const H = 60 * M;
    const D = 24 * H;
    const Y = 365 * D;

    let year: string | number = Math.floor(stamp / Y);
    let day: string | number = Math.floor((stamp - year * Y) / D);
    let hour: string | number = Math.floor((stamp - year * Y - day * D) / H);
    let min: string | number = Math.floor((stamp - year * Y - day * D - hour * H) / M);
    let second: string | number = Math.floor(stamp - year * Y - day * D - hour * H - min * M);

    year = year > 0 ? `${year} year` : '';
    day = day > 0 ? `${day} days` : '';
    hour = hour > 9 ? `${hour}` : `0${hour}`;
    min = min > 9 ? `${min}` : `0${min}`;
    second = second > 9 ? `${second}` : `0${second}`;
    return `${year} ${day} ${hour}:${min}:${second}`;
};

//生产环境屏蔽console.log
(() => {
    if (ISPRODUCTION) {
        for (let i in console) {
            console[i] = () => { return () => { } }
        }
    }
})()