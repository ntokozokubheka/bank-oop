const { BankAccount } = require("./bank_account.js");
const {
  generateAccountNumber,
  isValidInterestRate,
  isValidAccountNumber,
  isValidAccountTypeName,
  checkDuplicateAccounts,
} = require("./helper_functions.js");

const { assertionMessages } = require("./helper_objects.js");
const assert = require("assert");

class Bank {
  constructor() {
    this.accountTypes = {};
    this.accounts = {};
  }

  addAccountType(accountTypeName, interestRate) {
    isValidAccountTypeName(accountTypeName);
    checkDuplicateAccounts(accountTypeName, this.accountTypes);
    this.accountTypes[accountTypeName] =
      isValidInterestRate(interestRate).toFixed(2);
  }

  openBankAccount(accountTypeName) {
    assert(
      accountTypeName in this.accountTypes,
      assertionMessages.assertAccountTypeName(accountTypeName)
    );

    const accountNumber = generateAccountNumber();

    this.accounts[accountNumber] = new BankAccount(
      parseFloat(this.accountTypes[accountTypeName])
    );
    this.accounts[accountNumber].type = accountTypeName;

    return accountNumber;
  }

  deposit(accountNumber, amount) {
    isValidAccountNumber(accountNumber, this.accounts);

    this.accounts[accountNumber].deposit(amount);
  }

  withdraw(accountNumber, amount) {
    isValidAccountNumber(accountNumber, this.accounts);

    this.accounts[accountNumber].withdraw(amount);
  }

  transfer(fromAccountNumber, toAccountNumber, amount) {
    isValidAccountNumber(fromAccountNumber, this.accounts);
    isValidAccountNumber(toAccountNumber, this.accounts);

    this.accounts[fromAccountNumber].withdraw(amount);
    this.accounts[toAccountNumber].deposit(amount);
  }

  compoundInterest() {
    for (const accountNumber in this.accounts) {
      this.accounts[accountNumber].compoundInterest();
    }
  }

  getBalance(accountNumber) {
    isValidAccountNumber(accountNumber, this.accounts);

    return this.accounts[accountNumber].balance.toFixed(2);
  }

  getInterestRate(accountNumber) {
    isValidAccountNumber(accountNumber, this.accounts);
    const accountType = this.accounts[accountNumber].type;
    return this.accountTypes[accountType].toFixed(2);
  }
}

module.exports = { Bank };