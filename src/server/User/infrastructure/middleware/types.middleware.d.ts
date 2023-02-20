import { NextApiRequest } from "next";

export interface paramsUpdate extends NextApiRequest {
    body: EntityUpdateClient;
    headers: {
      setcookies: string;
    };
  }

export type typeMiddlewareUpdate = (req: paramsUpdate) =>
  | {
      status: true;
      content: typeTokeVerified;
    }
  | { status: false; content: string };

export interface paramsProfile extends NextApiRequest {
  headers: {
    setcookies: string;
  };
}

export type typeMiddlewareProfile = (req: paramsProfile) =>
  | {
      status: true;
      content: typeTokeVerified;
    }
  | { status: false; content: string };