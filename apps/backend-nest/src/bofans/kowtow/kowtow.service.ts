import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/library/prisma.service';

@Injectable()
export class KowtowService {
  constructor(private prisma: PrismaService) {}

  // 磕
  async kowtow(openId: string, count = 1): Promise<boolean> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    await this.prisma.userDailyBehavior.upsert({
      where: {
        openId_date: {
          openId,
          date: today,
        },
      },
      create: {
        openId,
        date: today,
        kowtowCount: count,
        firstKowtowTime: now,
        lastKowtowTime: now,
      },
      update: {
        kowtowCount: { increment: count },
        lastKowtowTime: now,
      },
    });
    await this.prisma.globalDailyStats.upsert({
      where: { date: today },
      update: { totalKowtows: { increment: count } },
      create: {
        date: today,
        totalKowtows: count,
      },
    });
    return true;
  }

  // 查询全部磕头次数，以及今天磕了的人数
  // 全部磕头次数：所有用户的kowtowCount加在一起
  // 今天磕了的人数：lastKowtowTime在今天的用户数
  // 以及获取我今天磕没磕
  async kowtowStats(openId?: string): Promise<{
    iKowtowedToday: boolean;
    totalCount: number;
    todayKowtowedUser: number;
  }> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    // 并行查询三个数据
    const [iKowtowedToday, totalCount, todayKowtowedUser] = await Promise.all([
      openId
        ? this.prisma.userDailyBehavior.findUnique({
            where: {
              openId_date: {
                openId,
                date: today,
              },
            },
          })
        : Promise.resolve(0),
      this.prisma.userDailyBehavior.aggregate({
        _sum: { kowtowCount: true },
      }),
      this.prisma.userDailyBehavior.count({
        where: {
          date: today,
        },
      }),
    ]);

    return {
      totalCount: totalCount._sum.kowtowCount || 0,
      todayKowtowedUser,
      iKowtowedToday: !!iKowtowedToday,
    };
  }
}
