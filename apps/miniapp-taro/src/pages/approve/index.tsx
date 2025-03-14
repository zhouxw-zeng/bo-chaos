import Taro from "@tarojs/taro";
import { useState } from "react";
import { ScrollView, View } from "@tarojs/components";
import { approveContext } from "@/lib/approve";
import "./index.scss";
import TabHead from "./components/tabHead/inedx";

export default function ApprovalPage() {
  // 获取路由参数
  const currentInstance = Taro.getCurrentInstance();
  const router = currentInstance?.router;
  let approve: string = "peding";
  if (router) {
    approve = router.params.approval!;
  }
  const [approveState, setApproveState] = useState(approve);
  const [refreshing, setRefreshing] = useState(false);
  const tabHandle = (approval: string) => {
    if (approveState !== approval) {
      setApproveState(approval);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      Taro.showNavigationBarLoading();
      // await fetchData();
      Taro.hideNavigationBarLoading();
      Taro.showToast({
        title: "刷新成功",
        icon: "success",
      });
    } catch (error) {
      Taro.hideNavigationBarLoading();
      Taro.showToast({
        title: "刷新失败",
        icon: "error",
      });
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View>
      <approveContext.Provider value={approveState}>
        <TabHead onClick={(e: string) => tabHandle(e)} />
        <ScrollView
          scrollY
          className="approva-container"
          refresherEnabled
          enableBackToTop
          refresherTriggered={refreshing}
          onRefresherRefresh={onRefresh}
        ></ScrollView>
      </approveContext.Provider>
    </View>
  );
}
