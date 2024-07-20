import { NextApiRequest, NextApiResponse } from "next";
import request from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const reqs = await request("/auth/apiLogin", {
        method: "POST",
        data: { username, password },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { code, msg, data } = reqs.data;
      if (code === 200) {
        res.setHeader(
          "Set-Cookie",
          `token=${data.access_token}; Path=/; HttpOnly`
        );
        res.status(200).json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login request to remote API", error);
      res.status(500).json({
        success: false,
        message: "Error during login request to remote API",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
