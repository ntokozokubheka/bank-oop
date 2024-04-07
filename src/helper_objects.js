const assertionMessages = {
  assertDataType: (value) => {
    return `Invalid data type entry for funds: ${value}. Please enter a decimal or number value.`;
  },

  assertNegativeValue: (value) => {
    return `Invalid number type for funds: ${value}. Please enter a positive value.`;
  },

  assertOverWithdrawnFunds: (value, funds) => {
    return `The amount you are trying to withdraw: ${value} is over the account balance: ${funds}. Please enter an amount less than or equal to the account balance.`;
  },

  assertDataTypeInterest: (value) => {
    return `Invalid data type entry for interest: ${value}. Please enter an int or float type value.`;
  },

  assertInvalidInterestRage: (value) => {
    return `Invalid interest rate input. The input type must be of type number :${value}.`;
  },

  assertLowFunds: (value) => {
    return `You have invalid funds available: ${value}. Interest does not apply.`;
  },

  assertInvalidAccountNumber: (value) => {
    return `The input account does not exist : ${value}.`;
  },

  assertAccountTypeName: (value) => {
    return `Invalid entry for account type. Please input correct value : ${value}.`;
  },
  assertAccountTypeDuplicate: (value) => {
    return `Duplicate account input : ${value}.`;
  },
  assertAccountNumberType: "Invalid account type. The account input should be a numeric value of type string.",
};

module.exports = { assertionMessages };