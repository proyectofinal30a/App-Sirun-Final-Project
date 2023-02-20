import { describe, expect, it, beforeEach } from "vitest";
import { EntityClientAuth } from "../../../domain/entity.user";
import { roles } from "../../../domain/emun";
import { tokenGenerator } from "../../auth/user.tokenGenerator";

describe("token generator", () => {
  it("tokenGenerator function should exist", () => {
    expect(tokenGenerator instanceof Function).toBe(true);
  });
  it(`It should return a hash passing an id and role as parameters`, () => {
    const registeredCustomer: EntityClientAuth = {
      id: "asd=adas-asdas-asda-sdsad-as",
      role: roles.CLIENT,
    };
    const hash = tokenGenerator(registeredCustomer).content.split(".").length;
    expect(hash).toBe(3);
  });
});
