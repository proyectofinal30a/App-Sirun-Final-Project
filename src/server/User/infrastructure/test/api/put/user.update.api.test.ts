import { describe, expect, it, beforeEach } from "vitest";
import {
  EntitySignUpClient,
  EntityParamsUpdateClient,
  EntityResponseUpdateClient,
} from "../../../../domain/entity.user";
import { tokenGenerator } from "../../../auth/user.tokenGenerator";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { PrismaUserRepository } from "../../../repository/prisma.user";
import { prisma } from "@/server/global/config/prismaClient";

beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("updateCLient Api End Point", () => {
  it("the sign up endpoint should work", async () => {
    try {
      await axios.put("http://localhost:3000/api/user/put/update");
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
  it("should throw an exception if the required parameters are not passed to it", async () => {
    try {
      await axios.put("http://localhost:3000/api/user/put/update");
    } catch (error: any) {
      expect(error.response.data.content).toBe("data not found");
    }
  });
  it("should throw an exception if not given a valid token", async () => {
    try {
      const dataUser: EntityParamsUpdateClient = {
        name: "Ezequiel",
        password: "1234567ABs",
        photo: "ezequiel.pjs",
      };
      const configAxios: AxiosRequestConfig<EntityParamsUpdateClient> = {
        method: "PUT",
        url: "http://localhost:3000/api/user/put/update",
        data: dataUser,
        headers: {
          setcookies: "test1",
        },
      };

      await axios(configAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe("invalid cookies");
    }
  });

  it(`with the correct data you should be able to update the client`, async () => {
    try {
      const newClient: EntitySignUpClient = {
        email: "ezequiel.ignacio.sosa@gmail.com",
        password: "ezequiel10A",
        photo: "Ezequiel.pnh",
        name: "ezequiel",
      };
      const clientPrisma = await new PrismaUserRepository().signUp(newClient);

      if (clientPrisma.content === null) return expect(true).toBe(false);

      const { role, id } = clientPrisma.content;

      const cookies = tokenGenerator({ role, id });

      if (cookies.status === false) return expect(true).toBe(false);

      const dataUser: EntityParamsUpdateClient = {
        name: "Ezequiel",
        password: "1234567ABs",
        photo: "ezequiel.pjs",
      };
      const configAxios: AxiosRequestConfig<EntityParamsUpdateClient> = {
        method: "PUT",
        url: "http://localhost:3000/api/user/put/update",
        data: dataUser,
        headers: {
          setcookies: cookies.content,
        },
      };
      
      interface responseApi {
        status: boolean;
        content: EntityResponseUpdateClient;
      }
      const { data: clientApi }: AxiosResponse<responseApi> = await axios(
        configAxios
      );

      expect(clientApi.content.name).toBe(dataUser.name);
    } catch (error) {
      console.log(error);
      expect(true).toBe(false);
    }
  });
});
