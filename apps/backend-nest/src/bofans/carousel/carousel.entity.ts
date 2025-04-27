/** 轮播图信息 */
export interface Carousel {
  url: string;
  width: string;
  height: string;
  carouselCanvas: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}
