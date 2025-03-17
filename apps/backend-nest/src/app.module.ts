import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BofansModule } from './bofans/bofans.module';

@Module({
  imports: [BofansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
