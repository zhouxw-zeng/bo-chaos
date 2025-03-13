import Taro from "@tarojs/taro";
import { useState } from "react";
import { View } from "@tarojs/components";
import { approveContext } from "@/lib/approve";
import "./index.scss";
import TabHead from "./components/tabHead/inedx";

export default function SubPage() {
  // 获取路由参数
  // 获取路由参数
  const currentInstance = Taro.getCurrentInstance();
  const router = currentInstance?.router;
  let approve: string = "peding";
  if (router) {
    approve = router.params.approval!;
  }
  const [approveState, setApproveState] = useState(approve);
  const tabHandle = (approval: string) => {
    console.log("CHECK=>", approval);
  };
  return (
    <View className="subpage-container">
      <approveContext.Provider value={approveState}>
        <TabHead onClick={() => tabHandle} />
      </approveContext.Provider>
    </View>
  );
}
