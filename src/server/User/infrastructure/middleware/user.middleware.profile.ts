import { isCertificationCookies } from "../validation/user.validation.cookies";
import type { typeMiddlewareProfile } from "./types.middleware";

export const middlewareProfile: typeMiddlewareProfile = (request) => {
  return isCertificationCookies(request);
};
