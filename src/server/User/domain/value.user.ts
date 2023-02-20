import { v4 as uuid } from "uuid";
import EntityClient, { EntityImplementsClassClient } from "./entity.user";
import { roles } from "./emun";
import bcryptjs from "bcryptjs";

export default class ClientValue implements EntityClient {
  name: string;
  email: string;
  password: string;
  id: string;
  photo: string;
  role: roles.CLIENT;
  active: boolean;

  constructor({ name, password, photo, email }: EntityImplementsClassClient) {
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.role = roles.CLIENT;
    this.active = false;
    this.id = uuid();
    this.password = password;
  }
  static async encriptPassword(password: string) {
    return await bcryptjs.hash(password, 10);
  }
  static readonly validatePassword = async (
    password: EntityClient["password"],
    pass: string
  ) => await bcryptjs.compare(password, pass);
}
