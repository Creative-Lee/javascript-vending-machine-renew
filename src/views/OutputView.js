const { Console } = require('@woowacourse/mission-utils');

const OutputView = {
  printMachineCoinList(coinList) {
    const templates = MSG_TEMPLATE.getMachineCoinListTemplates(coinList);

    templates.forEach((template) => Console.print(template));
  },
};

const MSG_TEMPLATE = {
  getMachineCoinListTemplates(coinList) {
    const templates = ['자판기가 보유한 동전'];

    coinList.forEach((coinCount, coinType) => {
      const template = `${coinType}원 - ${coinCount}개`;

      templates.push(template);
    });

    return templates;
  },
};

module.exports = OutputView;
