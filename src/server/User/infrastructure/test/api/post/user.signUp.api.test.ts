import { describe, expect, it, beforeEach } from "vitest";
import { EntitySignUpClient } from "../../../../domain/entity.user";
import { tokenGenerator } from "../../../auth/user.tokenGenerator";
import axios, { AxiosResponse } from "axios";
import { PrismaUserRepository } from "../../../repository/prisma.user";
import { prisma } from "@/server/global/config/prismaClient";

beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("SignUp Api End Point", () => {
  it("the sign up endpoint should work", async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/post/signUp"
      );
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
  it("Sign up middleware should work", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequiel@gmail.com",
        password: "Password123",
      };
      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signUp",
        method: "POST",
        body: client,
      };
      interface ResponseSignUp extends AxiosResponse {
        data: { content: EntitySignUpClient };
      }
      const response: ResponseSignUp = await axios(paramsAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe("Customer data is missing");
    }
  });
  it("middleware should control already logged in users", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequiel@gmial.com",
        password: "12312312312Asd",
        photo: "ezequiel.jp",
      };
      const methodsPrisma = new PrismaUserRepository();

      await methodsPrisma.signUp(client);
      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signUp",
        method: "POST",
        data: client,
      };
      await axios(paramsAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe("the user is already logged in");
    }
  });
  it("should be able to register the user", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequielasas@gmial.com",
        password: "12312312312Asd",
        photo: "ezequiel.jp",
      };

      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signUp",
        method: "POST",
        data: client,
      };
      interface ResponseSignUp extends AxiosResponse {
        data: { content: EntitySignUpClient };
      }
      const response: ResponseSignUp = await axios(paramsAxios);

      expect(response.data.content.email).toBe(client.email);
    } catch (error: any) {
      expect(true).toBe(false);
    }
  });
});
