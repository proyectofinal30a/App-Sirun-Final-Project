import { typeMiddleware } from "../middleware/types.middleware";
interface paramsCertification extends NextApiRequest {
  headers: {
    setcookies: string;
  };
}

type typeTokeVerified = {
  id: string;
  role: "CLIENT" | "ADMIN" | "SUPERADMIN";
};

type funtionCertification = (res: paramsCertification) =>
  | {
      status: true;
      content: typeTokeVerified;
    }
  | {
      status: false;
      content: string;
    };
