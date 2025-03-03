const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yuanbo.online/rpg/bofans"
    : "http://localhost:3001/api";

function _fetch(url: string, options?: RequestInit) {
  return fetch(`${API_BASE_URL}${url}`, options);
}

export async function login(data: {
  account: string;
  password: string;
}): Promise<boolean> {
  return await _fetch("/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // 确保Cookie能够被设置
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("登录失败");
  });
}
