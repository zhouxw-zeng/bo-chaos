import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KowtowModule } from './kowtow/kowtow.module';
import { PhotoModule } from './photo/photo.module';
import { CategoryModule } from './category/category.module';
import { GlobalModule } from './global/global.module';
import { CarouselModule } from './carousel/carousel.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UsersModule,
    KowtowModule,
    PhotoModule,
    CategoryModule,
    CarouselModule,
  ],
})
export class BofansModule {}
