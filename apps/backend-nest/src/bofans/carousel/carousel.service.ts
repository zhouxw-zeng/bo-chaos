import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/library/prisma.service';
import { Carousel } from './carousel.entity';

@Injectable()
export class CarouselService {
  constructor(private prisma: PrismaService) {}
  async carousel(openId?: string): Promise<{ code: number; list: Carousel[] }> {
    // Prisma TODO
    return {
      code: 200,
      list: [],
    };
  }
  async carouselUpdate(openId: string, params): Promise<boolean> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    // Promise TODO
    return true;
  }
}
