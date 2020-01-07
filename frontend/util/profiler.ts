// 性能检测
export const Profiler = (
    id, // id
    phase, // "mount" or "update"
    actualDuration, // 呈现提交的更新所花费的时间
    baseDuration, // 估计在没有memoization的情况下呈现整个子树的时间
    startTime, // 开始时间
    commitTime, // 结束时间
    interactions, // 属于此更新的一组交互
) => {
    console.group('系统性能Profiler');
    console.log(`id:${id}`);
    console.log(`类型:${phase}`);
    console.log(`%c耗时:${actualDuration}`, 'color: #1890ff;');
    console.log(`%c子树耗时:${baseDuration}`, 'color: #00b389;');
    console.log(`开始:${startTime}`);
    console.log(`结束:${commitTime}`);
    console.log(`交互:${interactions}`);
    console.groupEnd();
};
