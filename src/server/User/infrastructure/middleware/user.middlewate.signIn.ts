import { ValidationUser } from "../validation/user.validation";

type typeValidationSignUp = (client: any) => {
  status: boolean;
  content: string;
};

export const middlewareSignIn: typeValidationSignUp = ({ password, email }) => {
  const { isNotPassword, isNotEmail } = ValidationUser;

  const isNotEmailOrPassword = isNotPassword(password) || isNotEmail(email);

  return isNotEmailOrPassword
    ? {
        status: false,
        content: "the email or the password are incorrect",
      }
    : { status: true, content: "all ok" };
};
