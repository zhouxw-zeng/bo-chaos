import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('create')
  async createCategory(
    @Body()
    categoryData: {
      system: string;
      name: string;
      secondCategory: string;
    },
  ) {
    try {
      await this.categoryService.createCategory(categoryData);
      return true;
    } catch {
      return false;
    }
  }
}
