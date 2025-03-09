import React from 'react';
import { ArrowUpRight, ArrowRightLeft } from 'lucide-react';
import { buttonVariants } from '@mono/ui/button';

export default function Tuixiu({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl pb-4">距离博哥退休还有</h1>
      {children}

      <div>
        <a
          className={buttonVariants({ variant: 'link' })}
          href="https://yuanbo.online/dagezi"
          target="_blank"
          rel="noreferrer"
        >
          合成大鸽子
          <ArrowUpRight />
        </a>
        <a
          className={buttonVariants({ variant: 'link' })}
          href="https://mp.weixin.qq.com/s/UnSRkdPLQA5kovVUhzUtwQ"
          target="_blank"
          rel="noreferrer"
        >
          用锐驰变 rich 🥰
          <ArrowUpRight />
        </a>
        <a className={buttonVariants({ variant: 'link' })} href="../reckful">
          切换科兴双子
          <ArrowRightLeft />
        </a>
      </div>
    </div>
  );
}
