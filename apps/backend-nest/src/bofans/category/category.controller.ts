import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('bofans/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('list')
  async getCategories(@Query('all') all?: string) {
    const categories = await this.categoryService.categories({
      all: all === 'true',
    });
    return categories;
  }

  @Post('create')
  async createCategory(
    @Body()
    categoryDto: {
      system: string;
      name: string;
      secondCategory: string;
    },
  ) {
    try {
      await this.categoryService.createCategory({
        ...categoryDto,
        author: { connect: { openId: 'system' } },
      });
      return true;
    } catch (e) {
      Logger.error(`Create category failed: ${e}`);
      throw new BadRequestException(e);
    }
  }
}
