import React from 'react';
import { useTuixiuCountDown, getCountDown } from '../../../hooks/countDown';
import { tuixiu } from '@mono/const';
import CopyToClipboardButton from '../../copyToClipboard';

const { boTuiXiuDay } = tuixiu;

export default function Tuixiu() {
  const countDown = useTuixiuCountDown(boTuiXiuDay);

  const getTuiClipboardText = React.useCallback(() => {
    const botui = getCountDown(boTuiXiuDay);
    return `普大喜奔，距离博哥退休还有${botui['yyyyMMDD hhmmss']}，转发到五个群再看你的头像，是真的！`;
  }, []);

  return (
    <>
      <p className="text-4xl pb-4">
        {countDown?.['yyyyMMDD hhmmss']}
        <span className="text-xl pl-1">{countDown?.['milliseconds']}</span>
      </p>
      <div className="text-xs pb-4 scale-50">(UTC+8)</div>

      <div className="pb-4">
        <CopyToClipboardButton text={getTuiClipboardText} />
      </div>
    </>
  );
}
