import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getToken, getHeader, removeToken } from "@/lib/utils/auth";
import {
  encryptBase64,
  encryptWithAes,
  generateAesKey,
} from "@/lib/utils/crypto";
import { encrypt } from "@/lib/utils/jsencrypt";
import { useRouter } from "next/router";

const errorCode: { [key: string]: string } = {
  "401": "Login status has expired, please login again.",
  "500": "Internal server error, please contact the administrator.",
  "601": "Data processing error, please contact the administrator.",
  default: "Request error, please contact the administrator.",
};

const service: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Content-Language": "zh_CN", // 对应国际化资源文件后缀
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = { ...config.headers, ...getHeader() };
    }

    const isEncrypt = config.headers?.isEncrypt === true;
    if (isEncrypt && (config.method === "post" || config.method === "put")) {
      const aesKey = generateAesKey();
      config.headers["encrypt-key"] = encrypt(encryptBase64(aesKey), true);
      config.data =
        typeof config.data === "object"
          ? encryptWithAes(JSON.stringify(config.data), aesKey)
          : encryptWithAes(config.data as string, aesKey);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    const code = res.code || 200;
    const msg = errorCode[code] || res.msg || errorCode["default"];

    if (code === 401) {
      // 处理 401 错误 - 清除 token 并跳转到登录页面
      removeToken();
      const router = useRouter();
      if (router.pathname !== "/login") {
        router.replace("/login");
      }
      return Promise.reject(new Error(msg));
    } else if (code === 500 || code === 601) {
      // 处理 500, 601 错误 - 显示错误消息
      // TODO: 显示错误消息的逻辑
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      // 处理其他错误码 - 显示通知
      // TODO: 显示通知的逻辑
      return Promise.reject(new Error(msg));
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    let message = "Request error, please contact the administrator.";
    if (error.message.includes("timeout")) {
      message = "System interface request timed out.";
    } else if (error.message.includes("Network Error")) {
      message = "Backend interface connection error.";
    } else if (error.message.includes("Request failed with status code")) {
      const code = error.message.substr(error.message.length - 3);
      message = `System interface ${code} error.`;
    }
    // TODO: 显示错误消息的逻辑
    return Promise.reject(error);
  }
);

export default service;