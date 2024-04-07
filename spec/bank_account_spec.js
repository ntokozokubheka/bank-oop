const { BankAccount } = require("../src/bank_account.js");

const { assertionMessages } = require("../src/helper_objects.js");

describe("BankAccount", () => {
  let account;
  beforeEach(function () {
    account = new BankAccount(12);
  });

  describe("constructor", () => {
    it("should initialize a BankAccount with the given interest rate", () => {
      expect(account.interestRate).toBe(12.0);
    });

    it("should initialize a BankAccount with a deposit", () => {
      expect(account.balance).toBe(0);
    });

    it("should initialize a BankAccount with the given interest rate of type number", () => {
      expect(typeof account.interestRate).toBe("number");
    });

    it("should throw an error for an invalid interest rate input", () => {
      expect(() => new BankAccount(-10)).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage(-10))
      );
    });

    it("should throw an error for an invalid interest rate input for non number type", () => {
      expect(() => new BankAccount("%")).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage("%"))
      );
    });

    it("should throw an error for a string interest rate input", () => {
      expect(() => new BankAccount("10")).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage("10"))
      );
    });
  });

  describe("deposit", () => {
    it("should deposit funds into the account", () => {
      account.deposit(500);

      expect(account.balance).toBe(500.0);
    });

    it("should throw an error for invalid deposit amount", () => {
      expect(() => account.deposit(-1000)).toThrow(
        new Error(assertionMessages.assertNegativeValue(-1000))
      );
    });

    it("should throw an error for invalid deposit that is not type number", () => {
      expect(() => account.deposit("%")).toThrow(
        new Error(assertionMessages.assertDataType("%"))
      );
    });

    it("should save a number type value ", () => {
      account.deposit(1000);

      expect(account.balance).toBe(1000.0);
    });
  });

  describe("withdraw", () => {
    it("should withdraw funds from the account", () => {
      account.balance = 1000;
      account.withdraw(500);

      expect(account.balance).toBe(500.0);
    });

    it("should throw an error for an overdrawn amount", () => {
      account.balance = 500;

      expect(() => account.withdraw(1000)).toThrow(
        new Error(assertionMessages.assertOverWithdrawnFunds(1000, 500))
      );
    });

    it("should throw an error for invalid withdrawal that is not type number", () => {
      expect(() => account.withdraw("%")).toThrow(
        new Error(assertionMessages.assertDataType("%"))
      );
    });

    it("should throw an error for a withdrawal that is negative", () => {
      expect(() => account.withdraw(-1)).toThrow(
        new Error(assertionMessages.assertNegativeValue(-1))
      );
    });

    it("should throw an error for a withdrawal input that a string", () => {
      account.balance = 2;

      expect(() => account.withdraw("1")).toThrow(
        new Error(assertionMessages.assertDataType("1"))
      );
    });
  });

  describe("compoundInterest", () => {
    it("should calculate and apply compound interest to the account balance", () => {
      account.balance = 1000;
      account.compoundInterest();

      expect(account.balance).toBe(1010.0);
    });

    it("should correctly apply compound interest when compounding occurs four times", () => {
      account.balance = 1000;
      account.compoundInterest();
      expect(account.balance).toBe(1010.0);
      account.compoundInterest();
      expect(account.balance).toBe(1020.1);
      account.compoundInterest();
      expect(account.balance).toBe(1030.3);
      account.compoundInterest();
      expect(account.balance).toBe(1040.6);
    });
  });
});