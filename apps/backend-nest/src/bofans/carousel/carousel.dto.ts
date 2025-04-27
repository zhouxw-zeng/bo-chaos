import { IsString, IsInt, ValidateNested } from 'class-validator';

export class CarouselCanvasDto {
  /**
   * 高度
   */
  @IsInt()
  width: number;

  /**
   * 宽度
   */
  @IsInt()
  height: number;
  /**
   * 左上顶点 x 轴
   */
  @IsInt()
  x: number;
  /**
   * 左上顶点 y 轴
   */
  @IsInt()
  y: number;
}
export class CarouselDto {
  /**
   * 图片路径
   */
  @IsString()
  url: string;
  /**
   * 图片宽度
   */
  @IsInt()
  width: number;
  /**
   * 图片高度
   */
  @IsInt()
  height: number;
  /**
   * 内部点赞canvas信息
   */
  @ValidateNested()
  carouselCanvas: CarouselCanvasDto;
}
