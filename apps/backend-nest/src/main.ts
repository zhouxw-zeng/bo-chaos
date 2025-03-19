import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { startWatchEnv } from './common/env.watcher';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  startWatchEnv();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
