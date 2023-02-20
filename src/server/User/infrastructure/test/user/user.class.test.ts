import { describe, it, expect } from "vitest";
import ClientValue from "../../../domain/value.user";

describe("class ClientValue", async () => {
  const testClient = new ClientValue({
    name: "Ezequiel",
    password: "123452Ax",
    photo: "hola.png",
    email: "ezequiel.ignacio",
  });
  it("should be able to instantiate", () => {
    expect(Boolean(testClient)).toBe(true);
  });
  it("the password should be encrypted", async () => {
    const encryptedPassword = (
      await ClientValue.encriptPassword(testClient.password)
    ).length;
    expect(encryptedPassword).toBeGreaterThan(10);
  });

  it("should have id", () => {
    expect(testClient.id).toString();
    expect(testClient.id.length).toBeGreaterThan(10);
  });
});
