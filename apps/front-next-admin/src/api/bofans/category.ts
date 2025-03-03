import { Category } from "@mono/prisma-client";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yuanbo.online/rpg/bofans"
    : "http://localhost:3001/api";

function _fetch(url: string, options?: RequestInit) {
  return fetch(`${API_BASE_URL}${url}`, options);
}

export async function getCategories(): Promise<Category[]> {
  return await _fetch("/category/list?all=true").then((res) => res.json());
}
