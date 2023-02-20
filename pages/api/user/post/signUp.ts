import { PrismaUserRepository } from "@/server/User/infrastructure/repository/prisma.user";
import type { NextApiRequest, NextApiResponse } from "next";
import type { EntitySignUpClient } from "@/server/User/domain/entity.user";
import { middlewareSignUp } from "@/server/User/infrastructure/middleware/user.middleware.signUp";
import { tokenGenerator } from "@/server/User/infrastructure/auth/user.tokenGenerator";
interface requestSingUpdate extends NextApiRequest {
  body: EntitySignUpClient;
}
type routeSignUp = (req: requestSingUpdate, res: NextApiResponse) => void;

const signUp: routeSignUp = async ({ body }, { status, setHeader }) => {
  try {
    const { name, email, photo } = body;

    const middlewareCheck = await middlewareSignUp(body);

    if (!middlewareCheck.status) return status(404).json(middlewareCheck);

    const client = await new PrismaUserRepository().signUp(body);

    if (client.content === null) throw new Error();

    const { id, role } = client.content;

    const cookies = tokenGenerator({ id, role });

    setHeader("setCookies", cookies.content);

    return status(201).json({ status: true, content: { name, email, photo } });
  } catch (error) {
    return status(500).json({ status: false, content: "error Server" });
  }
};

export default signUp;
