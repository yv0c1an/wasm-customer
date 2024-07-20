// utils/api.ts
export async function apiRequest(
  url: string,
  method: string,
  data?: any,
  headers: Record<string, string> = {}
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };

  console.log("apiRequest", url, method, data, headers);
  if (method !== "GET" && method !== "HEAD" && data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}
