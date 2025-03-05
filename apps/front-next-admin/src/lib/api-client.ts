import { basePath } from "../../env";
// 创建一个通用的fetch函数，处理认证和错误
export async function apiFetch(url: string, options: RequestInit = {}) {
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://yuanbo.online/rpg/bofans"
      : "http://localhost:3001/api";

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: "include", // 确保Cookie被发送
    });

    // 处理401未授权错误
    if (response.status === 401) {
      window.location.href = basePath + "/login";
      return null;
    }

    return response;
  } catch (error) {
    console.error("API请求失败:", error);
    throw error;
  }
}
