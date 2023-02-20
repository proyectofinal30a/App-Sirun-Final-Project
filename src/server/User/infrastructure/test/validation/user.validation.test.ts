import { describe, it, expect } from "vitest";
import { ValidationUser } from "../../validation/user.validation";

describe("customer validations", () => {
  it("The notIsName method should return false when given a correct parameter.", () => {
    expect(ValidationUser.isNotName("Ezequiel")).toBe(false);
  });
  it("The notIsEmail method should return false when given a correct parameter.", () => {
    expect(ValidationUser.isNotEmail("Ezequiel@gmail.com")).toBe(false);
  });
  it("The notIsPassword method should return false when given a correct parameter.", () => {
    expect(ValidationUser.isNotPassword("Password123")).toBe(false);
  });
  it("The isNotClient method should return false when given a correct parameter.", () => {
    expect(
      ValidationUser.IsNotClient({
        name: "ezequiel",
        email: "Ezequiel12@gmail.com",
        photo: "ezequiel.jpg",
        password: "ezequielE10",
      })
    ).toBe(false);
  });
});
