/**
 * 防抖
 * @param {Function} func - 目标函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖处理后的函数，带有 cancel 方法
 */
export const debounce = (
  func: Function,
  delay = 300,
  immediate = false,
): Function => {
  let timer: NodeJS.Timeout | null = null;
  let lastArgs: any = null; // 保存最后一次调用的参数
  let lastThis = null; // 保存最后一次调用的 this 上下文

  // 定义防抖函数
  function debounced(...args) {
    const context = this;
    lastArgs = args;
    lastThis = context;

    if (timer) {
      clearTimeout(timer); // 清除之前的定时器
    }

    // 立即执行逻辑：如果没有定时器且需要立即执行
    if (immediate && !timer) {
      func.apply(context, args); // 立即执行函数
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      if (!immediate) {
        // 非立即执行模式：使用最后一次保存的参数和上下文
        func.apply(lastThis, lastArgs);
      }
      // 执行后重置状态
      timer = null;
      lastArgs = null;
      lastThis = null;
    }, delay);
  }

  // 添加取消方法
  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      lastArgs = null;
      lastThis = null;
    }
  };

  return debounced;
};

/**
 * 节流函数
 * @param {Function} func - 需要节流的目标函数
 * @param {number} interval - 时间间隔（单位：毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 返回一个经过节流处理的函数
 */
export const throttle = (
  func: Function,
  interval = 300,
  immediate = false,
): Function => {
  let lastTime = 0; // 上次执行时间
  let timer: NodeJS.Timeout | null = null; // 定时器变量

  return function (...args) {
    const now = Date.now();
    const context = this;

    // 立即执行逻辑
    if (immediate && !lastTime) {
      func.apply(context, args); // 立即执行函数
      lastTime = now; // 更新上次执行时间
    }

    // 如果未到时间间隔，则设置定时器
    if (now - lastTime >= interval) {
      if (timer) {
        clearTimeout(timer); // 清除之前的定时器
      }
      timer = setTimeout(() => {
        func.apply(context, args); // 执行目标函数
        lastTime = Date.now(); // 更新上次执行时间
        timer = null; // 清空定时器
      }, interval);
    }
  };
};
