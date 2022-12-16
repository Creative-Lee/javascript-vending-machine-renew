const { Console } = require('@woowacourse/mission-utils');

const REQUEST_MSG = {
  machineMoneyAmount: '자판기가 보유하고 있는 금액을 입력해 주세요.',
  productInfo: '상품명과 가격, 수량을 입력해 주세요.',
};

const InputView = {
  readMachineMoneyAmount(callback) {
    Console.readLine(REQUEST_MSG.machineMoneyAmount, callback);
  },

  readProductInfo(callback) {
    Console.readLine(REQUEST_MSG.productInfo, callback);
  },
};

module.exports = InputView;
