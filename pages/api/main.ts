import { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

const getMainData = async (token: string) => {
  return await request("/main/main/myMain", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateSettings = async (token: string, data: any) => {
  return await request("/main/main/editMain", {
    method: "PUT",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb", // 设定请求体大小限制
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const response = await getMainData(token);
      const { code, data } = response.data;

      if (code === 200) {
        return res.status(200).json({ success: true, data, code });
      } else {
        return res
          .status(code)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else if (req.method === "POST") {
      const response = await updateSettings(token, req.body);
      const { code, data } = response.data;

      if (code === 200) {
        return res.status(200).json({ success: true, data });
      } else {
        return res
          .status(code)
          .json({ success: false, message: "Failed to update settings" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error during request to remote API", error);
    return res.status(500).json({
      success: false,
      message: "Error during request to remote API",
    });
  }
}
