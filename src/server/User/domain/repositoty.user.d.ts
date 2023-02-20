import EntityClient, {
  EntitySignUpClient,
  EntityUpdateClient,
} from "./entity.user";

type IdParam = EntityClient["id"];
type EmailParam = EntityClient["email"];
interface publicCustomerInformation
  extends Pick<EntityClient, "email" | "name" | "photo"> {}
type returnMethods<type> = Promise<{
  status: true | false;
  content: type | null;
}>;

export default interface UserRepository {
  signUp: (
    client: EntitySignUpClient
  ) => returnMethods<publicCustomerInformation>;

  signIn: (id: IdParam) => returnMethods<publicCustomerInformation>;

  getProfile: (id: IdParam) => returnMethods<publicCustomerInformation>;

  updateClient: (
    clientUpdate: EntityUpdateClient
  ) => returnMethods<publicCustomerInformation>;

  disableClient: (id: IdParam) => returnMethods<string>;

  activeClient: (email: EmailParam) => returnMethods<string>;
}
