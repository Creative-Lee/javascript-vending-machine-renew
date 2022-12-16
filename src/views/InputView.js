const { Console } = require('@woowacourse/mission-utils');

const REQUEST_MSG = {
  machineAmountMoney: '자판기가 보유하고 있는 금액을 입력해 주세요.',
};

const InputView = {
  readMachineAmountMoney(callback) {
    Console.readLine(REQUEST_MSG.machineAmountMoney, callback);
  },
};

module.exports = InputView;
