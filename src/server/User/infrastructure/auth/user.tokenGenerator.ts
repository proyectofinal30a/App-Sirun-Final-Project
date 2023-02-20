import jwt from "jsonwebtoken";
import { JWT } from "../../../global/config/environment";
import { EntityClientAuth } from "../../domain/entity.user";
import { serialize } from "cookie";
import { NODE_ENV } from "../../../global/config/environment";
type tpyeAuthentication = (auth: EntityClientAuth) => {
  status: boolean;
  content: string;
};
export const tokenGenerator: tpyeAuthentication = (auth) => {
  const { id, role} = auth;

  if (!id || !role || !JWT || !NODE_ENV)
    return { status: false, content: "the data entered is incorrect" };
    
  const token = jwt.sign(auth, JWT, {
    expiresIn: 60 * 60 * 24,
  });

  const serialized = serialize("cookieUser", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: true,
    maxAge: 1000 * 60 * 24 * 30,
    path: "/",
  });

  return { status: true, content: serialized };
};
