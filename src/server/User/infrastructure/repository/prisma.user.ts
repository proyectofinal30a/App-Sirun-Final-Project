import EntityClient, {
  EntitySignUpClient,
  EntityUpdateClient,
} from "../../domain/entity.user";

import { prisma } from "../../../global/config/prismaClient";

import type UserRepository from "../../domain/repositoty.user";
import ClientValue from "../../domain/value.user";

export class PrismaUserRepository implements UserRepository {
  async signUp(client: EntitySignUpClient) {
    try {
      if (
        !client.email ||
        !client.password ||
        !client.password ||
        !client.photo
      )
        return { status: false, content: null };
      client = {
        ...client,
        password: await ClientValue.encriptPassword(client.password),
      };
      const newClient = new ClientValue(client);

      const { name, email, photo, id, role } = newClient;
      const clientOfPrisma = await prisma.client.create({ data: newClient });

      return {
        status: true,
        content: {
          name,
          email,
          photo,
          id,
          role,
          password: clientOfPrisma.password,
        },
      };
    } catch (error) {
      return { status: false, content: null };
    }
  }
  async signIn(email: EntityClient["email"]) {
    try {
      const client = await prisma.client.findUnique({
        where: { email },
      });
      if (client) {
        const { name, email, photo, id, role, password } = client;

        return {
          status: true,
          content: { name, email, photo, id, role, password },
        };
      }
      throw new Error();
    } catch (error) {
      return { status: false, content: null };
    }
  }
  async getProfile(id: EntityClient["id"]) {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
      });
      if (client) {
        const { name, email, photo } = client;
        return { status: true, content: { name, email, photo } };
      }
      throw new Error();
    } catch (error) {
      return { status: false, content: null };
    }
  }
  updateClient = async (update: EntityUpdateClient) => {
    try {
      const { name, photo, password: pass, id } = update;
      const password = await ClientValue.encriptPassword(pass);
      const clientUpdate = await prisma.client.update({
        where: { id },
        data: { name, photo, password },
      });
      if (clientUpdate) {
        const { name, email, photo } = clientUpdate;
        return { status: true, content: { name, email, photo } };
      }
      throw new Error();
    } catch (error) {
      return { status: false, content: null };
    }
  };

  async disableClient(id: EntityClient["id"]) {
    try {
      const disabledClient = await prisma.client.update({
        where: { id },
        data: {
          active: false,
        },
      });
      if (disabledClient) {
        return {
          status: true,
          content: `the user with the id ${id} has been deactivated`,
        };
      }
      throw new Error();
    } catch (error) {
      return { status: false, content: null };
    }
  }
  async activeClient(email: EntityClient["email"]) {
    try {
      const clientActivated = await prisma.client.update({
        where: { email },
        data: {
          active: true,
        },
      });
      if (clientActivated) {
        return {
          status: true,
          content: `the user with the id ${clientActivated.id} has been activated`,
        };
      }
      throw new Error();
    } catch (error) {
      return { status: false, content: null };
    }
  }
}
