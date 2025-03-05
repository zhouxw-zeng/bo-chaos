import { apiFetch } from "@/lib/api-client";
import { Photo } from "@mono/prisma-client";

export async function getReviewList(): Promise<Photo[]> {
  const response = await apiFetch("/photo/reviewList");
  if (!response) return [];
  return await response.json();
}

export async function batchReviewPass(
  photos: { id: number; categoryId: number }[][],
): Promise<void> {
  await apiFetch("/photo/batchReviewPass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photos }),
  });
}

export async function batchReviewReject(ids: number[]): Promise<void> {
  await apiFetch("/photo/batchReviewReject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
}
