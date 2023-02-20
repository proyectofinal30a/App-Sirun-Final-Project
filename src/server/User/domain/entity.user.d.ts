import { roles } from "./emun";

export default interface EntityClient {
  id: string;
  name: string;
  email: string;
  active: boolean;
  photo: string;
  password: string;
  role: roles.CLIENT;
}

export interface EntitySignUpClient
  extends Omit<EntityClient, "id" | "active" | "role"> {}

export interface EntitySingInClient
  extends Pick<EntityClient, "email" | "password"> {}

export interface EntityProfileClient
  extends Omit<EntityClient, "active" | "password" | "id" | "role"> {}

export interface EntityOutActive extends Omit<EntityClient, "active"> {}

export interface EntityUpdateClient
  extends Pick<EntityClient, "name" | "photo" | "password" | "id"> {}

export interface EntityParamsUpdateClient  
extends Pick<EntityClient, "name" | "photo" | "password" > {}

export interface EntityResponseUpdateClient  
extends Pick<EntityClient, "name" | "photo" | "password" > {}

export interface EntityImplementsClassClient
  extends Pick<EntityClient, "name" | "email" | "photo" | "password"> {}

export interface EntityClientAuth extends Pick<EntityClient, "id"> {
  role: "CLIENT" | "ADMIN" | "SUPERADMIN";
}
