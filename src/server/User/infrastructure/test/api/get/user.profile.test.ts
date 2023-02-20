import { describe, expect, it, beforeEach } from "vitest";
import { EntityProfileClient } from "../../../../domain/entity.user";
import { prisma } from "@/server/global/config/prismaClient";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("Enpoint Profile Get User", () => {
  it("endpoint GET Profile should exist", async () => {
    try {
      const configAxios: AxiosRequestConfig = {
        method: "GET",
        url: "http://localhost:3000/api/user/get/profile",
      };
      await axios(configAxios);
    } catch (error: any) {
      return expect(error.response.status).toBe(404);
    }
  });

  it("endpoint GET Profile should ask for cookie header", async () => {
    try {
      const configAxios: AxiosRequestConfig = {
        method: "GET",
        url: "http://localhost:3000/api/user/get/profile",
      };
      await axios(configAxios);
    } catch (error: any) {
      return expect(error.response.data.content).toBe(
        "data not found"
      );
    }
  });

  it("endpoint GET Profile should be able to check the cookie", async () => {
    try {
      const configAxios: AxiosRequestConfig = {
        method: "GET",
        url: "http://localhost:3000/api/user/get/profile",
        headers: {
          setcookies: "asas",
        },
      };
      await axios(configAxios);
    } catch (error: any) {
      return expect(error.response.data.content).toBe("invalid cookies");
    }
  });

  it("if the cookie is correct it should display the data", async () => {
    try {
      const newClient = {
        name: "ezequiel",
        password: "123123ABCa",
        email: "ezequiel@gmail.com",
        photo: "ezequieil.png",
      };
      const configAxiosSignUp: AxiosRequestConfig = {
        method: "POST",
        url: "http://localhost:3000/api/user/post/signUp",
        data: newClient,
      };
      interface headers extends AxiosResponse {
        data: {
          status: boolean;
          content: string | EntityProfileClient;
        };
        headers: {
          setcookies: string;
        };
      }
      const clientApi: headers = await axios(configAxiosSignUp);

      const configAxios: AxiosRequestConfig = {
        method: "GET",
        url: "http://localhost:3000/api/user/get/profile",
        headers: {
          setcookies: clientApi.headers.setcookies,
        },
      };
      interface responseApi extends AxiosResponse {
        data: {
          status: boolean;
          content: string | EntityProfileClient;
        };
      }

      const { data }: responseApi = await axios(configAxios);

      if (typeof data.content === "string") return expect(true).toBe(false);
      if (typeof clientApi.data.content === "string")
        return expect(true).toBe(false);

      expect(data.content.email).toBe(clientApi.data.content.email);
    } catch (error: any) {
      return expect(false).toBe(true);
    }
  });
});
