import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as FormData from 'form-data';
import * as sharp from 'sharp';
import axios from 'axios';
import { env } from '@/const/env';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { photo as photoUtils } from '@mono/utils';

@Controller('bofans/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: { account: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    if (
      loginDto.account === 'zhangyiming' &&
      loginDto.password === 'geiyuanboketou'
    ) {
      const token = await this.jwtService.signAsync({
        account: loginDto.account,
      });
      response.cookie('token', token);
      return true;
    }
    throw new UnauthorizedException('用户名密码错误');
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  async userInfo(@Request() req: { user: { openId: string } }) {
    return await this.usersService.user({
      openId: req.user.openId,
    });
  }

  @UseGuards(AuthGuard)
  @Post('updateNickname')
  async updateNickname(
    @Request() req: { user: { openId: string } },
    @Body() updateDto: { nickname: string },
  ) {
    try {
      await this.usersService.updateUser({
        where: { openId: req.user.openId },
        data: { nickname: updateDto.nickname },
      });

      return true;
    } catch {
      return false;
    }
  }

  @UseGuards(AuthGuard)
  @Post('updateAvatar')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() })) // 显式配置内存存储
  async updateAvatar(
    @Request() req: { user: { openId: string } },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const openId = req.user.openId;

    // 校验文件是否存在
    if (!file) {
      Logger.error('未接收到文件');
      return { success: false, message: '未上传文件' };
    }

    try {
      const formData = new FormData();
      const getFileExtension = (filename: string) => {
        const lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex === -1 ? '' : filename.substring(lastDotIndex);
      };
      const originalExtension = file.originalname
        ? getFileExtension(file.originalname)
        : '.png';

      // 获取图片宽高
      const imgMetadata = await sharp(file.buffer).metadata();

      if (!imgMetadata.height || !imgMetadata.width) {
        throw new Error('Image Read Failed, Get Image Size Error');
      }
      const filename = photoUtils.genStandardPictureName({
        category: 'avatar',
        user: openId,
        ext: originalExtension,
        height: imgMetadata.height,
        width: imgMetadata.width,
      });

      formData.append('file', file.buffer, filename);
      formData.append('path', 'bofans/avatars');
      formData.append('should_unzip', 'false');
      formData.append('token', env.OSS_RS_UPLOAD_TOKEN);

      const uploadRes = await axios.post(
        `${env.PHOTO_OSS_HOST}/oss_service/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      Logger.log('调用oss_service res', uploadRes.data);
      if (uploadRes.status === 200) {
        const avatarUrl = `${env.PHOTO_OSS_HOST}/bofans_static/avatars/${filename}`;
        const user = await this.usersService.updateUser({
          where: { openId },
          data: { avatarUrl },
        });
        return user;
      }

      throw new Error('头像上传失败');
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
