import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';

import { CarouselService } from './carousel.service';
import { AuthGuard } from '../auth/auth.guard';
import { CarouselDto } from './carousel.dto';

@Controller('bofans/carousel')
export class CarouselController {
  constructor(private CarouselService: CarouselService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('carousel')
  carousel(@Request() req: { user?: { openId: string } }) {
    const openId = req.user?.openId;
    return this.CarouselService.carousel(openId);
  }

  @UseGuards(AuthGuard)
  @Post('carouselUpdate')
  carouselUpdate(
    @Request() req: { use: { openId: string } },
    @Body()
    carouselDto: CarouselDto,
  ) {
    const { openId } = req.use;
    return this.CarouselService.carouselUpdate(openId, carouselDto);
  }
}
