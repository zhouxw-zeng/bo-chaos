"use client";
import { getReviewList } from "@/api/bofans/review";
export default function page() {
  getReviewList().then((res) => {
    console.log(res);
  });
  return <div> Welcome to Bofans Home</div>;
}
