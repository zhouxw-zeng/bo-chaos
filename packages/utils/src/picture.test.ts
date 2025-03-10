import { expect, test } from "vitest";
import { getStandardPictureInfo } from "./picture";

const fileLink =
  "https://zhangyiming.online/bofans_static/photo/photo_o-IL466Ma-FMt63a70SourViYSO0_1740489818352.jpg";

test("getStandardPictureInfo", () => {
  const fileInfo = getStandardPictureInfo(fileLink);
  expect(fileInfo?.ext).toBe("jpg");
});
