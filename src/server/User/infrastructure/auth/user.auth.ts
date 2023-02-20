import { compare } from "bcryptjs";
type passwords = {
  authClient: string;
  authServer: string;
};
type tpyeAuthentication = (passwords: passwords) => Promise<{
  status: boolean;
  content: string;
}>;
export const authCLient: tpyeAuthentication = async ({
  authClient,
  authServer,
}) => {
  try {
    if (!authClient || !authServer)
      return { status: false, content: "the email or the password are incorrect" };

    const itIsValid = await compare(authClient, authServer);

    return itIsValid
      ? { status: true, content: "all ok" }
      : { status: false, content: "the email or the password are incorrect" };
  } catch (error) {
    return { status: false, content: "the email or the password are incorrect" };
  }
};
