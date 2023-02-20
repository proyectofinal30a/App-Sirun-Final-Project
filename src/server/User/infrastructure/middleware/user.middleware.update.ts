import { typeMiddlewareUpdate } from "./types.middleware";
import { ValidationUser } from "../validation/user.validation";
import { isCertificationCookies } from "../validation/user.validation.cookies";

export const middlewareUpdate: typeMiddlewareUpdate = (request) => {
  
  const { IsNotDataUpdate } = ValidationUser;
  const { body } = request;

  if (IsNotDataUpdate(body)) return { status: false, content: "data not found" };

  return isCertificationCookies(request);
};
