import { View, Button, Image, Text, Canvas } from "@tarojs/components";
import { useState, useEffect, useRef, useContext } from "react";
import Taro from "@tarojs/taro";
import BoSheng from "@/components/boSheng";
import { AppContext } from "@/lib/context";
import { useShare } from "@/lib/share";
import useLocalStorage from "@/hooks/use-local-storage";
import { getKowtowStats, batchKowtow } from "../../api/kowtow";
import "./index.scss";
import God from "../../images/god.png";
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

  async function handleKowtow() {
    try {
      await createLikeAnimation();
      await setKowtowCount(kowtowCount + 1);
    } catch (e: any) {
      console.log("ERROR=>", e);
    }
  }
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
        setKowtowCount(0);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // 点赞图标库
  const godIcon = [
    "🌼",
    "👍",
    "🌹",
    "🚀",
    "⭐",
    "😻",
    "🦄",
    "🥳",
    "🧸",
    "🧨",
    "❤️",
    "💕",
    "🍔",
  ];

  useEffect(() => {
    // 初始化 canvas context
    const query = Taro.createSelectorQuery();
    query
      .select("#god-bo-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        // const canvas = res[0]?.node;
        // const ctx = canvas?.getContext("2d");
        // const dpr = Taro.getSystemInfoSync().pixelRatio;
        // canvas.width = res[0].width * dpr;
        // canvas.height = res[0].height * dpr;
        // ctx.scale(dpr, dpr);
      });
  }, []);
  // 创建点赞动画
  const createLikeAnimation = () => {
    let currentNumber = Math.floor(Math.random() * 12);
    const query = Taro.createSelectorQuery();
    query
      .select("#god-bo-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext("2d");
        const xSkew = Math.ceil(Math.random() * 50);

        const startX = canvas.width / 8 + xSkew;
        const startY = canvas.height - 20;
        const animationId = Date.now();

        animationQueue.current.push({
          id: animationId,
          x: startX,
          y: startY,
          text: godIcon[currentNumber],
          opacity: 1,
        });
        if (animationState.current) return;
        animationState.current = true;
        const animate = () => {
          const animations = animationQueue.current.filter(
            (animation: Animation) => animation.opacity > 0,
          );
          animationQueue.current = animations.map((animation: Animation) => {
            const { id, x, y, opacity, text } = animation;
            return {
              id,
              x,
              y: y - 2,
              text,
              opacity: parseFloat((opacity - 0.02).toFixed(2)),
            };
          });
          animationQueue.current.forEach((animation: Animation) => {
            ctx.clearRect(animation.x - 48, animation.y - 48, 384, 96);
            ctx.save();
            ctx.font = "48px serif";
            ctx.fillStyle = `rgba(255, 0, 0, ${animation.opacity})`;
            ctx.textAlign = "center";
            ctx.scale(2, 1);
            ctx.fillText(animation.text, animation.x, animation.y);
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
            <Canvas type="2d" id="god-bo-canvas" className="canvas" />
            <Image src={God}></Image>
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
