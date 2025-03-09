import React from 'react';
import { ArrowUpRight, ArrowRightLeft } from 'lucide-react';
import { buttonVariants } from '@mono/ui/button';

export default function Tuixiu({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl pb-4">距离Reckful退休还有</h1>
      {children}
      <div>
        <a
          className={buttonVariants({ variant: 'link' })}
          href="https://rocom.qq.com/"
          target="_blank"
          rel="noreferrer"
        >
          充值加速退休进度
          <ArrowUpRight />
        </a>
        <a className={buttonVariants({ variant: 'link' })} href="../bo">
          切换科兴双子
          <ArrowRightLeft />
        </a>
      </div>
    </div>
  );
}
