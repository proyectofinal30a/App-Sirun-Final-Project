import { PrismaUserRepository } from "@/server/User/infrastructure/repository/prisma.user";
import { NextApiRequest, NextApiResponse } from "next";
import { EntityParamsUpdateClient } from "@/server/User/domain/entity.user";
import { middlewareUpdate } from "@/server/User/infrastructure/middleware/user.middleware.update";
interface RequestUpdate extends NextApiRequest {
  body: EntityParamsUpdateClient;
  headers: {
    setcookies: string;
  };
}

type EnpointProfile = (req: RequestUpdate, res: NextApiResponse) => void;

const update: EnpointProfile = async (req, { status }) => {
  try {
    
    const isValidToken = middlewareUpdate(req);

    if (!isValidToken.status) {
      const { status: boolean, content } = isValidToken;

      return status(404).json({ status: boolean, content });
    }

    const { id } = isValidToken.content;
    const { name, password, photo } = req.body;
    const updateClientPrisma = await new PrismaUserRepository().updateClient({
      id,
      name,
      password,
      photo,
    });

    if (updateClientPrisma.content === null) throw new Error();

    return status(200).json({
      status: true,
      content: updateClientPrisma.content,
    });
  } catch (error) {

    return status(500).json({
      status: false,
      content: "Error Server",
    });
  }
};

export default update;
