import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_URL, // 配置基础URL
  timeout: 50000, // 超时时间 50秒
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Content-Language": process.env.NEXT_PUBLIC_LANGUAGE || "zh_CN",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// 通用请求方法
const request = async <T = any>(
  endpoint: string,
  options: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await service(url, options);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default request;
