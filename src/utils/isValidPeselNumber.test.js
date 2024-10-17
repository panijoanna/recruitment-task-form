import { describe, expect, it } from "vitest";
import { isValidPeselNumber } from "./isValidPeselNumber";

describe("isValidPeselNumber function", () => {
  it("should return true for a valid PESEL", () => {
    const pesel = "64042999928";
    expect(isValidPeselNumber(pesel)).toBe(true);
  });

  it("should return false if the date is incorrect", () => {
    const pesel = "52023114478";
    expect(isValidPeselNumber(pesel)).toBe(false);
  });

  it("should return false if the gender code is invalid", () => {
    const pesel = "44051401959";
    expect(isValidPeselNumber(pesel)).toBe(false);
  });

  it("should return false if the PESEL is too short", () => {
    const pesel = "7745639";
    expect(isValidPeselNumber(pesel)).toBe(false);
  });

  it("should return false if the PESEL is too long", () => {
    const pesel = "800424487747";
    expect(isValidPeselNumber(pesel)).toBe(false);
  });

  it("should return false if the control number is invalid", () => {
    const pesel = "97031003023";
    expect(isValidPeselNumber(pesel)).toBe(false);
  });
});
