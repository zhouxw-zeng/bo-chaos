import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/library/prisma.service';

interface Carousel {
  id: number;
  width: number;
  height: number;
  kowtowCanvas: any;
}

@Injectable()
export class CarouselService {
  constructor(private prisma: PrismaService) {}
  async carousel(openId?: string): Promise<Carousel[]> {
    // Prisma TODO
    return [];
  }
  async carouselUpdate(openId: string, params): Promise<boolean> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    // Promise TODO
    return true;
  }
}
