import { prisma } from "../../../global/config/prismaClient";
import { ValidationUser } from "../validation/user.validation";

type typeValidationSignUp = (
  client: any
) => Promise<{ status: boolean; content: string }>;

export const middlewareSignUp: typeValidationSignUp = async (client) => {
  if (ValidationUser.IsNotClient(client))
    return { status: false, content: "Customer data is missing" };

  const repeatClient = await prisma.client.findUnique({
    where: { email: client.email },
  });

  if (repeatClient)
    return { status: false, content: "the user is already logged in" };

  return { status: true, content: "all ok" };
};
