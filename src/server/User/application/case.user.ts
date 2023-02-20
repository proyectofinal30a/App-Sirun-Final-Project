import EntityClient, {
  EntitySignUpClient,
  EntityUpdateClient,
} from "../domain/entity.user";
import UserRepository from "../domain/repositoty.user";
import ClientValue from "../domain/value.user";

export default class ClientUseCase implements UserRepository {
  constructor(private readonly UserRepository: UserRepository) {}

  public signUp = async (client: EntitySignUpClient) => {
    const newClient = new ClientValue(client);
    return await this.UserRepository.signUp(newClient);
  };

  public signIn = async (id: EntityClient["id"]) =>
    await this.UserRepository.signIn(id);

  public getProfile = async (id: EntityClient["id"]) =>
    await this.UserRepository.getProfile(id);

  public updateClient = async (clientUpdate: EntityUpdateClient) =>
    await this.UserRepository.updateClient(clientUpdate);

  public disableClient = async (id: EntityClient["id"]) =>
    await this.UserRepository.disableClient(id);
}
