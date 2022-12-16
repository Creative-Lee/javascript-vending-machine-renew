const { hasOnlyNumber } = require('./NumberValidation.js');
const { isDivisibleByMinimumUnitPrice } = require('./MoneyValidation.js');

const Validation = {
  validateMachineMoneyAmount(moneyInput) {
    if (!moneyInput) {
      throw new Error(ERROR_MSG.emptyInput);
    }

    if (!hasOnlyNumber(moneyInput)) {
      throw new Error(ERROR_MSG.invalidInputType);
    }

    if (!isDivisibleByMinimumUnitPrice(moneyInput)) {
      throw new Error(ERROR_MSG.indivisibleMoneyAmount);
    }
  },

  validateProductInfo(productInfo) {},
};

const ERROR_MSG = {
  emptyInput: '[Error] 입력값이 없습니다.',
  invalidInputType: '[Error] 숫자가 아닌 문자를 입력하셨습니다. 숫자만 입력해주세요',
  indivisibleMoneyAmount: '[Error] 입력값이 최소 금액 단위로 나누어 떨어지지 않습니다.',
};

module.exports = Validation;
