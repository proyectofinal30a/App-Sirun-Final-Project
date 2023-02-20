import { certificationCLient } from "../auth/user.certification";
import type { funtionCertification } from "./type.validation";

export const isCertificationCookies: funtionCertification = ({ headers }) => {
  
  const { setcookies } = headers;

  if (!setcookies) return { status: false, content: "data not found" };

  if (typeof setcookies !== "string")
    return { status: false, content: "incorrect parameters" };

  const isCertification = certificationCLient(setcookies);
  if (
    isCertification.status === false ||
    typeof isCertification.content === "string"
  )
    return { status: false, content: "invalid cookies" };

  return { status: true, content: isCertification.content };
};
