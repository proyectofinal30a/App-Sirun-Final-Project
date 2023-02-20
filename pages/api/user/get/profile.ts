import { certificationCLient } from "@/server/User/infrastructure/auth/user.certification";
import { PrismaUserRepository } from "@/server/User/infrastructure/repository/prisma.user";
import { NextApiRequest, NextApiResponse } from "next";
import { middlewareProfile } from "@/server/User/infrastructure/middleware/user.middleware.profile";

export interface paramsProfile extends NextApiRequest {
  headers: {
    setcookies: string;
  };
}

type EnpointProfile = (req: paramsProfile, res: NextApiResponse) => void;

const profile: EnpointProfile = async (req, { status }) => {
  try {
    const isValid = middlewareProfile(req);

    if (typeof isValid.content === "string") {
      const { status: boolean, content } = isValid;

      return status(404).json({ status: boolean, content });
    }

    const { id } = isValid.content;

    const findClientById = await new PrismaUserRepository().getProfile(id);

    if (findClientById.content === null) throw new Error();

    return status(200).json({ status: true, content: findClientById.content });
  } catch (error) {
    return status(500).json({
      status: false,
      content: "Error Server",
    });
  }
};

export default profile;
