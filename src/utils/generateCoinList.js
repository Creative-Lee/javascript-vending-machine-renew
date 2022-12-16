const { generate } = require('./RandomCoinGenerator.js');

const generateCoinList = (moneyAmount) => {
  const coinList = new Map(dummyCoinList);

  while (moneyAmount) {
    const coinType = generate();

    const isValidCoinType = moneyAmount - coinType >= 0;
    if (!isValidCoinType) continue;

    coinList.set(coinType, coinList.get(coinType) + 1);
    moneyAmount -= coinType;
  }

  return coinList;
};

const dummyCoinList = [
  [500, 0],
  [100, 0],
  [50, 0],
  [10, 0],
];

module.exports = generateCoinList;
