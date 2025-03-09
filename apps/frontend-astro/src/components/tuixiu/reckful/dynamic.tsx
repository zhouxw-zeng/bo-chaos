import React from 'react';
import { useTuixiuCountDown, getCountDown } from '../../../hooks/countDown';
import { tuixiu } from '@mono/const';
import CopyToClipboardButton from '../../copyToClipboard';

const { reckfulTuiXiuDay, reckfulChangQiFuWu } = tuixiu;

export default function Tuixiu() {
  const countDown = useTuixiuCountDown(reckfulTuiXiuDay);
  const changQiFuWuCountDown = useTuixiuCountDown(reckfulChangQiFuWu);

  const getTuiClipboardText = React.useCallback(() => {
    const tui = getCountDown(reckfulTuiXiuDay);
    return `道路是曲折的，前途是光明的，虽然张某人还有 ${tui['yyyyMMDD hhmmss']} 就退休了，但忠诚和奋斗是终身的！`;
  }, []);

  return (
    <>
      <p className="text-4xl pb-4">
        {countDown?.['yyyyMMDD hhmmss']}
        <span className="text-xl pl-1">{countDown?.milliseconds}</span>
      </p>

      <p className="pb-4">
        距离获得<span className="text-tencent-primary">长期服务假</span>
        还有&nbsp;&nbsp;{changQiFuWuCountDown?.['yyyyMMDD hhmmss']}
      </p>
      <div className="text-xs pb-4 scale-50">(UTC+8)</div>

      <div className="pb-4">
        <CopyToClipboardButton text={getTuiClipboardText} />
      </div>
    </>
  );
}
