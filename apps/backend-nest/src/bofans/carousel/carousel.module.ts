import { Module } from '@nestjs/common';
import { CarouselController } from './carousel.controller';
import { CarouselService } from './carousel.service';
import { PrismaService } from '@/library/prisma.service';

@Module({
  providers: [PrismaService, CarouselService],
  controllers: [CarouselController],
})
export class CarouselModule {}
