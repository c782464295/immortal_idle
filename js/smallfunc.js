/***
 * 返回离线时间
 */
function getOfflineTimeDiff() {
    const currentTime = new Date().getTime();
    if (offline.timestamp === null)
        throw new Error('Offline timestamp is null');
    const originalTimeDiff = currentTime - offline.timestamp;
    const timeDiff = Math.min(originalTimeDiff, 64800000);
    return { timeDiff, originalTimeDiff };
}