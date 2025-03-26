import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { ReactNode } from "react";
import "./index.scss";
const SwiperImg = ({
  changeSwiper,
  images,
  accountIndex,
}: {
  changeSwiper: (e: number) => void;
  images: any;
  accountIndex: number;
}): ReactNode => {
  const handleChange = (e) => {
    changeSwiper(e);
  };
  return (
    <>
      <Swiper
        className="swiper-block"
        current={accountIndex}
        onChange={(e) => handleChange(e.detail.current)}
        vertical={false}
        circular
        autoplay
        full
        interval={5000}
      >
        {images &&
          images.map((img, index) => {
            return (
              <SwiperItem key={index} className="swiper-item">
                <Image style={`width`} className="image" src={img.img}></Image>
              </SwiperItem>
            );
          })}
      </Swiper>
    </>
  );
};

export default SwiperImg;
