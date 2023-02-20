import { NextApiRequest } from "next";
import { verify } from "jsonwebtoken";
import { JWT } from "@/server/global/config/environment";

export type typeTokeVerified = {
  id: string;
  role: "CLIENT" | "ADMIN" | "SUPERADMIN";
};
type functionCer = (header: string) => {
  status: boolean;
  content: string | typeTokeVerified;
};

export const certificationCLient: functionCer = (header) => {
  try {
    if (!header || !JWT)
      return {
        status: false,
        content: "should have header",
      };

    if (typeof header !== "string")
      return { status: false, content: "Invalid Token" };
    const tokenClient = header.split(";")[0].split("=")[1];

    if (!tokenClient) return { status: false, content: "Invalid Token" };

    const tokenVerifi = verify(tokenClient, JWT) as typeTokeVerified;

    return { status: true, content: tokenVerifi };
  } catch (error) {
    return { status: false, content: "Invalid Token" };
  }
};
