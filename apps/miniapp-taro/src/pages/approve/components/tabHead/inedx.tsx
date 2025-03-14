import { View, Image } from "@tarojs/components";
import { ReactNode, useContext } from "react";
import { approveContext } from "@/lib/approve";
import "./index.scss";
import pedingIcon from "@/images/approve/peding_icon.png";
import pedingTodoIcon from "@/images/approve/peding_todo_icon.png";
import approved from "@/images/approve/approved_icon.png";
import approvedTodo from "@/images/approve/approved_todo_icon.png";
import rejected from "@/images/approve/reject_icon.png";
import rejectedTodo from "@/images/approve/reject_todo_icon.png";

interface ApprovalMenu {
  label: string;
  value: string;
  icon: string;
  currentIcon: string;
}
const approveMenu: ApprovalMenu[] = [
  {
    label: "审核中",
    value: "peding",
    icon: pedingTodoIcon,
    currentIcon: pedingIcon,
  },
  {
    label: "已通过",
    value: "approved",
    icon: approvedTodo,
    currentIcon: approved,
  },
  {
    label: "已驳回",
    value: "rejected",
    icon: rejectedTodo,
    currentIcon: rejected,
  },
];

const mockApprove = {
  peding: 10,
  approved: 10,
  rejected: 10,
};

const DefautTab = ({ approval }: { approval: ApprovalMenu }): ReactNode => {
  const approvalState = useContext(approveContext);
  const currentState = approvalState === approval.value;
  return (
    <View
      className={`${currentState ? "current-tab" : "default-tab"} tab-block`}
    >
      <View className="icon-block">
        <Image
          src={currentState ? approval.currentIcon : approval.icon}
          className="head-icon"
        />
      </View>
      <View
        className={`${currentState ? "current-title" : "default-title"} tab-title`}
      >
        {approval.label}
      </View>
      <View className="tool">
        <View className="approve-num">{mockApprove[approval.value]}</View>
        {/* <View className="pageNum">当前页码：0</View> */}
      </View>
    </View>
  );
};

interface TabHeadComponent {
  onClick: (value: string) => void;
}
const TabHead = ({ onClick }: TabHeadComponent): ReactNode => {
  return (
    <>
      <View className="tab-head">
        {approveMenu.map((approval: ApprovalMenu, index: number) => {
          return (
            <div key={index} onClick={() => onClick(approval.value)}>
              {<DefautTab approval={approval} />}
            </div>
          );
        })}
      </View>
    </>
  );
};

export default TabHead;
