const { Bank } = require("../src/bank.js");
const { BankAccount } = require("../src/bank_account.js");

const { assertionMessages } = require("../src/helper_objects.js");

describe("Bank", () => {
  let bank,
    testAccountTypeName,
    interestRate,
    testAccountNumber,
    testAccountNumber2,
    testAccountTypeName2;

  beforeEach(() => {
    bank = new Bank();
    testAccountTypeName = "testAccountTypeTest";
    testAccountTypeName2 = "testAccountTypeTest2";
    interestRate = 10;
    testAccountNumber = "1234567890";
    testAccountNumber2 = "1234567981";

    bank.accounts[testAccountNumber] = new BankAccount(interestRate);
    bank.accounts[testAccountNumber].balance = 1500;
    bank.accounts[testAccountNumber].type = testAccountTypeName;

    bank.accounts[testAccountNumber2] = new BankAccount(interestRate);
    bank.accounts[testAccountNumber2].balance = 500;
    bank.accounts[testAccountNumber2].type = testAccountTypeName2;

    bank.accountTypes[testAccountTypeName] = interestRate;
  });

  describe("constructor", () => {
    beforeEach(() => {
      bank = new Bank();
    });
    it("should initialize a bank with no account types present", () => {
      expect(bank.accountTypes).toEqual({});
    });

    it("should initialize a bank with no accounts present", () => {
      expect(bank.accounts).toEqual({});
    });
  });

  describe("addAccountType", () => {
    it("should initialize a bank account type with corresponding interest rate", () => {
      bank.addAccountType(testAccountTypeName2, interestRate);
      expect(parseFloat(bank.accountTypes[testAccountTypeName2])).toBe(10.0);
    });

    it("should throw an error for an invalid a bank account type entry", () => {
      expect(() => bank.addAccountType(0, interestRate)).toThrow(
        new Error(assertionMessages.assertAccountTypeName(0))
      );
    });

    it("should throw an error for an invalid interest input in for bank account interest", () => {
      expect(() => bank.addAccountType(testAccountTypeName2, 0)).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage(0))
      );
    });

    it("should throw an error for an interest input that is negative", () => {
      expect(() => bank.addAccountType(testAccountTypeName2, -1)).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage(-1))
      );
    });

    it("should throw an error for an interest input of type string", () => {
      expect(() => bank.addAccountType(testAccountTypeName2, "5")).toThrow(
        new Error(assertionMessages.assertInvalidInterestRage("5"))
      );
    });
  });

  describe("openBankAccount", () => {
    it("should return a string containing containing 10 digits", () => {
      expect(bank.openBankAccount(testAccountTypeName)).toMatch(/^\d+$/);
    });

    it("should return a string type value", () => {
      expect(typeof bank.openBankAccount(testAccountTypeName)).toBe("string");
    });

    it("should throw an error for a bank account type name input that is invalid", () => {
      expect(() => bank.openBankAccount(0)).toThrow(
        new Error(assertionMessages.assertAccountTypeName(0))
      );
    });
  });

  describe("deposit", () => {
    it("should deposit into a bank account", () => {
      bank.deposit(testAccountNumber, 500);
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(2000.0);
    });

    it("should throw an error for an invalid deposit into a bank account", () => {
      expect(() => bank.deposit(testAccountNumber, -1)).toThrow(
        new Error(assertionMessages.assertNegativeValue(-1))
      );
    });

    it("should throw an error for a deposit into a non existent bank account", () => {
      expect(() => bank.deposit(0, 10)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0))
      );
    });
  });

  describe("withdraw", () => {
    it("should deposit into a bank account", () => {
      bank.withdraw(testAccountNumber, 500);
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(1000.0);
    });

    it("should throw an error for invalid withdrawal into a bank account", () => {
      expect(() => bank.withdraw(testAccountNumber, 1501)).toThrow(
        new Error(assertionMessages.assertOverWithdrawnFunds(1501, 1500))
      );
    });

    it("should throw an error for invalid account number withdrawal", () => {
      expect(() => bank.withdraw(0, 2)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0, 2))
      );
    });
  });

  describe("transfer", () => {
    it("should transfer funds to a bank account", () => {
      bank.transfer(testAccountNumber, testAccountNumber2, 500);
      expect(parseFloat(bank.accounts[testAccountNumber2].balance)).toBe(
        1000.0
      );
    });

    it("should throw an error for funds taken from a non existent account", () => {
      expect(() => bank.transfer(0, testAccountNumber2, 500)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0))
      );
    });

    it("should throw an error for funds transferred to a non existent bank accounts", () => {
      expect(() => bank.transfer(testAccountNumber, 0, 500)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0))
      );
    });

    it("should throw an error for invalid transfer amount", () => {
      expect(() =>
        bank.transfer(testAccountNumber, testAccountNumber2, 5000)
      ).toThrow(
        new Error(assertionMessages.assertOverWithdrawnFunds(5000, 1500))
      );
    });
  });

  describe("compoundInterest", () => {
    it("should apply compound interest on account balances", () => {
      bank.compoundInterest();
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(1512.5);
    });

    it("should correctly apply compound interest when compounding occurs 4 times", () => {
      bank.compoundInterest();
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(1512.5);
      bank.compoundInterest();
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(1525.1);
      bank.compoundInterest();
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(
        1537.81
      );
      bank.compoundInterest();
      expect(parseFloat(bank.accounts[testAccountNumber].balance)).toBe(
        1550.63
      );
    });
  });

  describe("getBalance", () => {
    it("should return the bank balance", () => {
      expect(parseFloat(bank.getBalance(testAccountNumber))).toBe(1500.0);
    });

    it("should throw an error when the account number is invalid", () => {
      expect(() => bank.getBalance(0)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0))
      );
    });
  });

  describe("getInterestRate", () => {
    it("should return the interest rate", () => {
      expect(parseFloat(bank.getInterestRate(testAccountNumber))).toBe(10.0);
    });

    it("should throw an error when the account number is invalid", () => {
      expect(() => bank.getInterestRate(0)).toThrow(
        new Error(assertionMessages.assertInvalidAccountNumber(0))
      );
    });
  });
});