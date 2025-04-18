import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import durationPlugin from "dayjs/plugin/duration";

// 扩展 dayjs 的类型定义
declare module "dayjs" {
  interface Dayjs {
    duration: typeof durationPlugin;
  }
}

dayjs.extend(timezone);
dayjs.extend(durationPlugin);
dayjs.tz.setDefault("Asia/Shanghai");

// Change to default export
export default dayjs;
