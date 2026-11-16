// 动画：两个通道（steer 转向 −1..1，throttle 油门 −1..1），关键帧线性插值；关节把通道值变成零件动作
export function sample(keys: [number, number][], t: number): number {
  if (!keys.length) return 0;
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]; const k = (t - t0) / ((t1 - t0) || 1); return v0 + (v1 - v0) * k; }
  }
  return keys[keys.length - 1][1];
}
