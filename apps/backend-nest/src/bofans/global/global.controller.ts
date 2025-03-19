import { Controller, Get, HttpCode } from '@nestjs/common';
import { BofansSystemConfigType } from '@mono/types';
import { env } from '@/const/env';

@Controller('bofans/global')
export class GlobalController {
  constructor() {}

  @HttpCode(200)
  @Get('systemConfig')
  systemConfig(): BofansSystemConfigType {
    return {
      inReview: env.BOFANS_WEAPP_PUBLISH_STATUS === 'in_review',
    };
  }
}
