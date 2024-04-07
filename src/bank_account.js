const {
  isValidWithdrawal,
  isValidInterestRate,
  compoundInterestCalculator,
  addFunds,
} = require("./helper_functions.js");

class BankAccount {
  constructor(interestRate) {
    this.interestRate = parseFloat(
      isValidInterestRate(interestRate).toFixed(2)
    );
    this.balance = 0.0;
  }

  deposit(funds) {
    this.balance = parseFloat(addFunds(funds, this.balance).toFixed(2));
  }

  withdraw(funds) {
    this.balance = parseFloat(
      isValidWithdrawal(funds, this.balance).toFixed(2)
    );
  }

  compoundInterest() {
    this.balance = parseFloat(
      compoundInterestCalculator(this.interestRate, this.balance).toFixed(2)
    );
  }
}

module.exports = { BankAccount };