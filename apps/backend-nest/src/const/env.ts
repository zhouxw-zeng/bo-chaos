type BOFANS_WEAPP_PUBLISH_STATUS_TYPE = 'normal' | 'in_review';
export const env: {
  JWT_SECRET: string;
  APP_ID: string;
  APP_SECRET: string;
  OSS_RS_UPLOAD_TOKEN: string;
  PHOTO_OSS_HOST: string;
  BOFANS_WEAPP_PUBLISH_STATUS: BOFANS_WEAPP_PUBLISH_STATUS_TYPE;
} = {
  JWT_SECRET: process.env.JWT_SECRET || 'yitiankeyige,tiantianhaojingshen',
  APP_ID: process.env.APP_ID!,
  APP_SECRET: process.env.APP_SECRET!,
  OSS_RS_UPLOAD_TOKEN: process.env.OSS_RS_UPLOAD_TOKEN!,
  PHOTO_OSS_HOST: process.env.PHOTO_OSS_HOST || 'https://zhangyiming.online',
  BOFANS_WEAPP_PUBLISH_STATUS:
    (process.env
      .BOFANS_WEAPP_PUBLISH_STATUS as BOFANS_WEAPP_PUBLISH_STATUS_TYPE) ||
    'normal',
};
