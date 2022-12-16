const MissionUtils = require("@woowacourse/mission-utils");

const RandomCoinGenerator = {
  COIN_500: 500,
  COIN_100: 100,
  COIN_50: 50,
  COIN_10: 10,

  generate() {
    return MissionUtils.Random.pickNumberInList([
      RandomCoinGenerator.COIN_500,
      RandomCoinGenerator.COIN_100,
      RandomCoinGenerator.COIN_50,
      RandomCoinGenerator.COIN_10,
    ]);
  },
};

module.exports = RandomCoinGenerator;
