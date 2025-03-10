import { isNil } from "es-toolkit";

export function genStandardPictureName({
  category,
  user,
  ext,
  width,
  height,
}: {
  category: string;
  user: number | string;
  ext: string;
  width: number | string;
  height: number | string;
}) {
  ext = ext.includes(".") ? ext.split(".").pop()! : ext;
  // 类型_上传者_上传时间_宽x高.扩展类型
  return (
    `${category}_${user}_${Date.now()}_${width}x${height}`.replace(/\./g, "") +
    `.${ext}`
  );
}

export function getStandardPictureInfo(fileLink: string) {
  const filename = fileLink.split("/").pop() || "";
  const [name, ext] = filename.split(".");
  const infos = name.split(".").shift()?.split("_") || [];
  const [category, user, uploadTime, size] = infos;
  if ([category, user, uploadTime, size, ext].some(isNil)) {
    return;
  }
  const [width, height] = size.split("x").map(Number);

  if ([width, height].some((n) => Number.isNaN(n))) {
    return;
  }

  return {
    ext,
    category,
    user,
    uploadTime,
    width: width,
    height: height,
  };
}
