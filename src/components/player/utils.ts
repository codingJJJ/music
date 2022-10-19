/**
 * 将时间转化为分钟数
 * @param time
 * @returns
 */

export const formatTime = (time: string) => {
  const m = (+time / 60).toFixed(0);
  const s = (+time % 60).toFixed(0);
  if (isNaN(+m) || isNaN(+s)) {
    return "00:00";
  }
  return (
    m.replace(/^\d$/, (s) => "0" + s) + ":" + s.replace(/^\d$/, (s) => "0" + s)
  );
};
