import { PrismaUserRepository } from "@/server/User/infrastructure/repository/prisma.user";
import type { NextApiRequest, NextApiResponse } from "next";
import type { EntitySingInClient } from "@/server/User/domain/entity.user";
import { middlewareSignIn } from "@/server/User/infrastructure/middleware/user.middlewate.signIn";
import { tokenGenerator } from "@/server/User/infrastructure/auth/user.tokenGenerator";
import { authCLient } from "@/server/User/infrastructure/auth/user.auth";
import { roles } from "@/server/User/domain/emun";
import { EntityOutActive } from "@/server/User/domain/entity.user";
interface requestSingUpdate extends NextApiRequest {
  body: EntitySingInClient;
}

interface responseDbPrisma {
  status: boolean;
  content: EntityOutActive | null;
}

type routeSignIn = (req: requestSingUpdate, res: NextApiResponse) => void;

const signIn: routeSignIn = async ({ body }, { status, setHeader }) => {
  try {
    const validationSignIn = middlewareSignIn(body);

    if (validationSignIn.status === false)
      return status(404).json(validationSignIn);

    const clientSignIn = await new PrismaUserRepository().signIn(body.email);

    if (clientSignIn.content === null)
      return status(401).json({
        status: false,
        content: "the email or the password are incorrect",
      });
    const { password: authClient } = body;
    const { password: authServer } = clientSignIn.content;
    const validation = await authCLient({ authClient, authServer });

    if (validation.status) {
      const { id, role, name, email, photo } = clientSignIn.content;

      const cookies = tokenGenerator({ id, role });

      if (!cookies.status) throw new Error();

      setHeader("setCookies", cookies.content);
      return status(201).json({
        status: true,
        content: { name, email, photo },
      });
      
    }

    return status(404).json({});
  } catch (error) {
    return status(500).json({ status: false, content: "Error server" });
  }
};

export default signIn;
