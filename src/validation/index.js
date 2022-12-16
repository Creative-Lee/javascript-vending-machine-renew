const { hasOnlyNumber } = require('./NumberValidation.js');

const Validation = {
  validateMachineMoneyAmount(moneyInput) {
    if (!hasOnlyNumber(moneyInput)) {
      throw new Error(ERROR_MSG.invalidInputType);
    }
  },
};

const ERROR_MSG = {
  invalidInputType: '[Error] 숫자가 아닌 문자를 입력하셨습니다. 숫자만 입력해주세요',
};

module.exports = Validation;
