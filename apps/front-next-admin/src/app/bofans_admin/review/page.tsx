"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getReviewList,
  batchReviewPass,
  batchReviewReject,
} from "@/api/bofans/review";
import { Photo } from "@mono/prisma-client";
import { getCategories, createCategory } from "@/api/bofans/category"; // 需要添加分类API

// 扩展Photo类型，添加分类名称
interface PhotoWithCategory extends Photo {
  categoryName?: string;
}

// 分类信息接口
interface CategoryInfo {
  id: number;
  system: string; // 一级分类
  name: string; // 一级分类名称
  secondCategory: string; // 二级分类
}

export default function PhotoReviewPage() {
  const [photos, setPhotos] = useState<PhotoWithCategory[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<number, CategoryInfo>>(
    {},
  );

  // 获取分类数据
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      const map = data.reduce(
        (acc, category) => {
          acc[category.id] = category;
          return acc;
        },
        {} as Record<number, CategoryInfo>,
      );
      setCategoryMap(map);
    } catch (error) {
      console.error("获取分类数据失败:", error);
    }
  }, []);

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getReviewList();
      setPhotos(data);
    } catch (error) {
      console.error("获取照片列表失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchPhotos();
  }, [fetchPhotos, fetchCategories]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(checked ? photos.map((photo) => photo.id) : []);
    },
    [photos],
  );

  const handleSelectOne = useCallback((checked: boolean, id: number) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  }, []);

  const handleApprove = useCallback(async () => {
    if (selectedIds.length === 0) return;

    try {
      setLoading(true);
      await batchReviewPass(selectedIds);
      setSelectedIds([]);
      await fetchPhotos();
    } catch (error) {
      console.error("批量通过失败:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedIds, fetchPhotos]);

  const handleReject = useCallback(async () => {
    if (selectedIds.length === 0) return;

    try {
      setLoading(true);
      await batchReviewReject(selectedIds);
      setSelectedIds([]);
      await fetchPhotos();
    } catch (error) {
      console.error("批量拒绝失败:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedIds, fetchPhotos]);

  // 添加单行操作函数
  const handleSingleApprove = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await batchReviewPass([id]);
        await fetchPhotos();
      } catch (error) {
        console.error("通过失败:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchPhotos],
  );

  const handleSingleReject = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await batchReviewReject([id]);
        await fetchPhotos();
      } catch (error) {
        console.error("拒绝失败:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchPhotos],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>图片审核</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end space-x-2">
          <Button
            variant="default"
            onClick={handleApprove}
            disabled={selectedIds.length === 0 || loading}
          >
            批量通过
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={selectedIds.length === 0 || loading}
          >
            批量拒绝
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedIds.length === photos.length && photos.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="全选"
                  />
                </TableHead>
                <TableHead>预览</TableHead>
                <TableHead>一级分类</TableHead>
                <TableHead>二级分类</TableHead>
                <TableHead>上传者</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photos.map((photo) => {
                const category = categoryMap[photo.categoryId];
                return (
                  <TableRow key={photo.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(photo.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(!!checked, photo.id)
                        }
                        aria-label={`选择图片 ${photo.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={photo.filename}
                        alt="预览图"
                        className="h-20 w-20 object-cover"
                      />
                    </TableCell>
                    <TableCell>{category?.name || "未知分类"}</TableCell>
                    <TableCell>
                      {category?.secondCategory || "未知分类"}
                    </TableCell>
                    <TableCell>{photo.authorOpenId}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSingleApprove(photo.id)}
                          disabled={loading}
                        >
                          通过
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleSingleReject(photo.id)}
                          disabled={loading}
                        >
                          拒绝
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {photos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    暂无待审核的图片
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
