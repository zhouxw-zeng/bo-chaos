"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// 轮播图磕头Canvas
interface CanvasConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 轮播图配置枚举
interface CarouselData {
  id: number;
  url: string;
  name: string;
  width: number;
  height: number;
  operator: string;
  kowtowCanvas: CanvasConfig;
  createTime?: string;
  updateTime?: string;
}
/**
 * 磕头轮播图配置页面
 */
export default function Carousel() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);

  const handleDelete = useCallback(
    (id: number) => {
      try {
        setLoading(true);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    },
    [carouselData],
  );

  // 添加一项轮播图
  const handleAppend = useCallback(() => {
    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  // 单选轮播图项
  const handleSelectOne = useCallback((checked: boolean, id: number) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    (checked: boolean) => {
      setSelectedIds(
        checked ? carouselData.map((carousel) => carousel.id) : [],
      );
    };
  }, [carouselData]);

  // 批量删除
  const handleBatchDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;
  }, [selectedIds]);

  const handleUpdate = useCallback((id: number) => {
    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  // 预览
  const handleReview = useCallback(
    (id: number) => {
      try {
        setLoading(true);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [carouselData],
  );

  /**
   * 获取轮播图信息
   */
  const fetchCarouse = useCallback(async () => {
    try {
      setLoading(true);
      setCarouselData([]);
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarouse();
  }, [fetchCarouse]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>轮播图管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between space-x-2">
          <div className="flex gap-4">
            <Button
              variant="destructive"
              onClick={handleAppend}
              disabled={selectedIds.length === 0 || loading}
            >
              增加轮播图
            </Button>
            <Button
              variant="default"
              onClick={handleBatchDelete}
              disabled={selectedIds.length === 0 || loading}
            >
              批量删除
            </Button>
          </div>
        </div>
      </CardContent>
      <div className="flex flex-1 wid">
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedIds.length === carouselData.length &&
                      carouselData.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="全选"
                  />
                </TableHead>
                <TableHead>轮播名称</TableHead>
                <TableHead>尺寸</TableHead>
                <TableHead>图片</TableHead>
                <TableHead>Canvas</TableHead>
                <TableHead>操作人</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carouselData.map((carousel) => {
                return (
                  <TableRow key={carousel.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(carousel.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(!!checked, carousel.id)
                        }
                        aria-label={`选择图片 ${carousel.id}`}
                      />
                    </TableCell>
                    <TableCell>{carousel.name}</TableCell>
                    <TableCell>
                      {`${carousel.width} / ${carousel.height}`}
                    </TableCell>
                    <TableCell>
                      <img
                        src={carousel.url}
                        alt={carousel.name || "预览图"}
                        className="h-20 w-20 object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      Canvas
                      {/* {carousel!.kowtowCanvas} */}
                    </TableCell>
                    <TableCell>{carousel.operator}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(carousel.id)}
                          disabled={loading}
                        >
                          预览
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleUpdate(carousel.id)}
                          disabled={loading}
                        >
                          修改
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(carousel.id)}
                          disabled={loading}
                        >
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              ;
            </TableBody>
          </Table>
        </div>
        <div className="">right Review</div>
      </div>
    </Card>
  );
}
