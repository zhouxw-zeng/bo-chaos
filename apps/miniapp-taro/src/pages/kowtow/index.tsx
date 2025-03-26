import { View, Button, Image, Text, Canvas } from "@tarojs/components";
import { useState, useEffect, useRef, useContext } from "react";
import Taro from "@tarojs/taro";
import BoSheng from "@/components/boSheng";
import { AppContext } from "@/lib/context";
import { useShare } from "@/lib/share";
import useLocalStorage from "@/hooks/use-local-storage";
import God from "@/images/kowtow/god.png";
import God2 from "@/images/kowtow/god2.jpg";
import God3 from "@/images/kowtow/god3.png";
import { getKowtowStats, batchKowtow } from "../../api/kowtow";
import SwiperImg from "@/components/swiperImg";
import "./index.scss";
interface KowtowStats {
  todayKowtowedUser: number | "-";
  totalCount: number | "-";
  iKowtowedToday: boolean;
}
interface Animation {
  id: number;
  x: number;
  y: number;
  text: string;
  opacity: number;
}
export default function Kowtow() {
  const [kowtowCount, setKowtowCount] = useLocalStorage<number>(
    "nowKowtowCount",
    0,
  );
  const swiperImages = [
    {
      img: God,
      ratio: (351 / 476).toFixed(2),
      canvas: {
        canvasX: "15%",
        canvasY: "68%",
        width: 90,
        height: 120,
      },
    },
    {
      img: God2,
      ratio: (256 / 388).toFixed(2),
      canvas: {
        canvasX: "20%",
        canvasY: "18%",
        width: 90,
        height: 120,
      },
    },
    {
      img: God3,
      ratio: (184 / 210).toFixed(2),
      canvas: {
        canvasX: "20%",
        canvasY: "10%",
        width: 90,
        height: 120,
      },
    },
  ];
  const [canvasInfo, setCanvasInfo] = useState({
    swiperIndex: 0,
    canvas: {
      canvasX: "15%",
      canvasY: "68%",
      width: 90,
      height: 120,
    },
  });
  const kowtowCountRef = useRef(kowtowCount);
  // 同步更新 ref
  useEffect(() => {
    kowtowCountRef.current = kowtowCount;
  }, [kowtowCount]);

  const animationQueue = useRef<Animation[]>([]);
  // 创捷一个动画状态 防止动画频繁添加导致速度错误
  const animationState = useRef(false);

  const { systemConfig } = useContext(AppContext);
  const [kowtowStats, setKowtowStats] = useState<KowtowStats>({
    todayKowtowedUser: "-",
    totalCount: "-",
    iKowtowedToday: false,
  });

  useEffect(() => {
    if (systemConfig) {
      Taro.setNavigationBarTitle({
        title: systemConfig.inReview ? "博Fans图片压缩工具简介" : "磕袁",
      });
    }
  }, [systemConfig]);

  useShare({
    title: "快来博Fans，今天你磕了吗？",
    path: "/pages/kowtow/index",
    imageUrl: "https://yuanbo.online/bofans_static/images/miniapplogo.png",
  });
  const handleKowtow = async () => {
    try {
      console.log("animationQueue", animationQueue.current);
      await createLikeAnimation();
      await setKowtowCount(kowtowCount + 1);
    } catch (e: any) {
      console.log("ERROR=>", e);
    }
  };

  // 每隔两秒调用一次，查询最新磕头状态
  useEffect(() => {
    const timer = setInterval(async () => {
      let batchBlockData;
      // 存在待提交磕头数，提交至库中
      const paramsKowtow = kowtowCountRef.current;
      if (paramsKowtow > 0) {
        batchBlockData = await batchKowtow({ count: paramsKowtow });
      }
      const kowtowStatsData: KowtowStats =
        (await getKowtowStats()) as KowtowStats;
      if (kowtowStatsData) {
        setKowtowStats(kowtowStatsData);
        batchBlockData && setKowtowCount(0);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // 轮播图变化 修改点赞canvas位置
  const changeSwiper = (e: number) => {
    const info = swiperImages[e];
    const { canvas } = info;
    setCanvasInfo({
      swiperIndex: e,
      canvas,
    });
  };

  // 点赞图标库
  const goodIcon = [
    "🌼",
    "👍",
    "🌹",
    "🚀",
    "⭐",
    "🦄",
    "🥳",
    "🧸",
    "🧨",
    "🤩",
    "😎",
    "🍔",
  ];

  // useEffect(() => {
  //   // 初始化 canvas context
  //   const query = Taro.createSelectorQuery();
  //   query
  //     .select("#god-bo-canvas")
  //     .fields({ node: true, size: true })
  //     .exec((res) => {
  //     });
  // }, []);
  // 创建点赞动画
  const createLikeAnimation = () => {
    let currentNumber = Math.floor(Math.random() * 12);
    const query = Taro.createSelectorQuery();
    const fontSize = 36;
    query
      .select("#god-bo-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext("2d");
        const xSkew = Math.ceil((Math.random() * canvas.width) / 6);
        const startX = fontSize / 2 + xSkew;
        console.log(canvas.width, startX, "startX");

        const startY = canvas.height - 20;
        const animationId = Date.now();
        animationQueue.current.push({
          id: animationId,
          x: startX,
          y: startY,
          text: goodIcon[currentNumber],
          opacity: 1,
        });
        // image = null;
        if (animationState.current) return;
        animationState.current = true;
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
          // 更新文字阶段
          animationQueue.current = animationQueue.current.filter(
            (animation: Animation) => animation.opacity > 0,
          );
          animationQueue.current = animationQueue.current.map(
            (animation: Animation) => {
              let { id, x, y, opacity, text } = animation;
              return {
                id,
                x,
                y: (y -= 2),
                text,
                opacity: parseFloat((opacity - 0.02).toFixed(2)),
              };
            },
          );

          // 渲染文字阶段
          animationQueue.current.map((animation: Animation) => {
            // 绘制阶段
            ctx.save();
            ctx.font = "36px serif";
            ctx.fillStyle = `rgba(255, 0, 0, ${animation.opacity})`;
            ctx.textAlign = "center";
            ctx.scale(3, 1);
            ctx.fillText(animation.text, animation.x, animation.y);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();
          });
          if (animationQueue.current.length > 0) {
            requestAnimationFrame(animate);
          } else {
            animationState.current = false;
          }
        };
        animate();
      });
  };
  return (
    <View className="kowtow-container">
      {systemConfig?.inReview ? (
        <>
          <Text>HI, 博Fans</Text>
          <Text>欢迎使用BoFans图片压缩工具</Text>
          <Text>请在个人中心（我）</Text>
          <Text>系统预设了一些图片分类，帮助你进行图片整理</Text>
          <Text>选择分类后点击上传图片</Text>
          <Text>带管理员审核通过后，会自动执行压缩流程</Text>
          <Text>压缩完成后可以在选择的分类中查看图片</Text>
        </>
      ) : (
        <>
          <BoSheng />
          <Text>
            全球博粉累计磕头{" "}
            {kowtowCount && kowtowStats.totalCount !== "-"
              ? (kowtowStats.totalCount as number) + kowtowCount
              : kowtowStats.totalCount}{" "}
            次
          </Text>
          <Text>
            今日签到博粉 {kowtowStats.todayKowtowedUser}{" "}
            <Text className="utc">(utc+8)</Text>
          </Text>
          <View className="god-bo">
            <Canvas
              type="2d"
              id="god-bo-canvas"
              style={`top: ${canvasInfo.canvas.canvasX};
                left: ${canvasInfo.canvas.canvasY};
                height: ${canvasInfo.canvas.height}px;
                width: ${canvasInfo.canvas.width}px;`}
              className="canvas"
            />
            {/* <Image className="image" src={God}></Image> */}

            <SwiperImg
              changeSwiper={changeSwiper}
              images={swiperImages}
              accountIndex={canvasInfo.swiperIndex}
            />
          </View>
          <Text className="love">博爱世人</Text>
          {kowtowStats.totalCount !== "-" && (
            <Text>
              {kowtowStats.iKowtowedToday
                ? "今日已磕，博哥对你很满意👍"
                : "今天你还没磕，抓紧"}
            </Text>
          )}
          <Button
            className="submit-kowtow"
            type="primary"
            onClick={handleKowtow}
          >
            磕
          </Button>
        </>
      )}
    </View>
  );
}
