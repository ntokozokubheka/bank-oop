const { assertionMessages } = require("./helper_objects.js");

const assert = require("assert");

const Decimal = require("decimal.js");

const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const isValidAccountTypeName = (value) => {
  assert(value.length > 0, assertionMessages.assertAccountTypeName(value));
  assert(typeof value === "string", assertionMessages.assertAccountNumberType);
};

const isValidMoneyAmount = (value) => {
  assert(typeof value === "number", assertionMessages.assertDataType(value));
  assert(value > 0, assertionMessages.assertNegativeValue(value));

  return value;
};

const addFunds = (deposit, currentBalance) => {
  const decimalDeposit = new Decimal(isValidMoneyAmount(deposit));
  const decimalCurrentBalance = new Decimal(currentBalance);

  return decimalDeposit.plus(decimalCurrentBalance).toNumber();
};

const isValidWithdrawal = (withdrawalAmount, currentAccountAmount) => {
  if (withdrawalAmount > currentAccountAmount) {
    assert(
      false,
      assertionMessages.assertOverWithdrawnFunds(
        withdrawalAmount,
        currentAccountAmount
      )
    );
  }

  const decimalValue = new Decimal(isValidMoneyAmount(withdrawalAmount));
  const decimalCurrentAccountAmount = new Decimal(currentAccountAmount);

  return decimalCurrentAccountAmount.minus(decimalValue).toNumber();
};

const isValidInterestRate = (value) => {
  assert(
    value > 0 && value <= 100 && typeof value == "number",
    assertionMessages.assertInvalidInterestRage(value)
  );
  const decimalValue = new Decimal(value);
  return decimalValue.toNumber();
};

const compoundInterestCalculator = (interestRate, principalAmount) => {
  const decimalInterestRate = new Decimal(interestRate);
  const decimalPrincipalAmount = new Decimal(principalAmount);

  const finalAmount = decimalPrincipalAmount.times(
    new Decimal(1).plus(decimalInterestRate.div(100))
  );

  return finalAmount
    .minus(decimalPrincipalAmount)
    .div(12)
    .plus(decimalPrincipalAmount)
    .toNumber();
};

const isValidAccountNumber = (accountNumber, accounts) => {
  assert(
    accounts.hasOwnProperty(accountNumber),
    assertionMessages.assertInvalidAccountNumber(accountNumber)
  );
  assert(
    typeof accountNumber === "string",
    assertionMessages.assertAccountNumberType
  );
};

const checkDuplicateAccounts = (value, accountsTypes) => {
  assert(
    !accountsTypes.hasOwnProperty(value),
    assertionMessages.assertAccountTypeDuplicate(value)
  );
};

module.exports = {
  isValidMoneyAmount,
  isValidWithdrawal,
  isValidInterestRate,
  compoundInterestCalculator,
  addFunds,
  generateAccountNumber,
  isValidAccountNumber,
  isValidAccountTypeName,
  checkDuplicateAccounts,
};