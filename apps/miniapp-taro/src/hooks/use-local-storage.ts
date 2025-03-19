import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
/**
 * 本地存储钩子
 * @param key 存储Key
 * @param initialValue 初始值
 * @returns 存储值 、 操作存方法
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const item = Taro.getStorageSync(key);
    item && setStoredValue(JSON.parse(item));
  }, [key]);
  let setValue = (value: T) => {
    // 保存状态
    setStoredValue(() => value);
    // 保存至本地
    Taro.setStorageSync(key, JSON.stringify(value));
  };
  // 抛出方法调用
  return [storedValue, setValue];
};

export default useLocalStorage;
