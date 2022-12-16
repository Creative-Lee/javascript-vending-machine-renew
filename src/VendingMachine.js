const InputValidator = require("./InputValidator");
const RandomCoinGenerator = require("./RandomCoinGenerator");

class VendingMachine {
  #coins = {
    COIN_500: 0,
    COIN_100: 0,
    COIN_50: 0,
    COIN_10: 0,
  };
  #userMoney;
  #products = [];

  constructor(money) {
    this.generateCoins(money);
  }

  #insertCoin(coin) {
    if (coin === 500) this.#coins.COIN_500 += 1;
    if (coin === 100) this.#coins.COIN_100 += 1;
    if (coin === 50) this.#coins.COIN_50 += 1;
    if (coin === 10) this.#coins.COIN_10 += 1;
  }

  generateCoins(money) {
    let currentMoney = 0;
    while (currentMoney < money) {
      let coin = RandomCoinGenerator.generate();
      if (coin < money && coin + currentMoney <= money) {
        currentMoney += coin;
        this.#insertCoin(coin);
      }
    }
  }

  addProduct(product) {
    const newProduct = product.substring(1, product.length - 1).split(",");
    InputValidator.validateProductForm(newProduct);

    this.#products.push({ name: newProduct[0], price: Number(newProduct[1]), count: Number(newProduct[2]) });
  }

  purchaseProduct(productName) {
    this.#products.forEach((product) => {
      if (product.name === productName) {
        InputValidator.validateAvailablePurchase(product, this.#userMoney);
        this.#userMoney -= product.price;
        product.count -= 1;
      }
    });
  }

  isAvailablePurchase() {
    let isAvailable = false;
    this.#products.forEach((product) => {
      if (product.price <= this.#userMoney && product.count > 0) {
        isAvailable = true;
      }
    });
    return isAvailable;
  }

  #isCoinsEmpty() {
    return (
      this.#coins.COIN_10 === 0 && this.#coins.COIN_50 === 0 && this.#coins.COIN_100 === 0 && this.#coins.COIN_500 === 0
    );
  }

  #coinFiveHundredBack(changes) {
    if (this.#userMoney >= 500 && this.#coins.COIN_500) {
      this.#userMoney -= 500;
      this.#coins.COIN_500 -= 1;
      changes.COIN_500 += 1;
    }
  }
  #coinOneHundredBack(changes) {
    if (this.#userMoney >= 100 && this.#coins.COIN_100) {
      this.#userMoney -= 100;
      this.#coins.COIN_100 -= 1;
      changes.COIN_100 += 1;
    }
  }
  #coinFiftyBack(changes) {
    if (this.#userMoney >= 50 && this.#coins.COIN_50) {
      this.#userMoney -= 50;
      this.#coins.COIN_50 -= 1;
      changes.COIN_50 += 1;
    }
  }
  #coinTenBack(changes) {
    if (this.#userMoney >= 10 && this.#coins.COIN_10) {
      this.#userMoney -= 10;
      this.#coins.COIN_10 -= 1;
      changes.COIN_10 += 1;
    }
  }
  getChanges() {
    let changes = { COIN_500: 0, COIN_100: 0, COIN_50: 0, COIN_10: 0 };
    while (this.#userMoney > 0 && !this.#isCoinsEmpty()) {
      this.#coinFiveHundredBack(changes);
      this.#coinOneHundredBack(changes);
      this.#coinFiftyBack(changes);
      this.#coinTenBack(changes);
    }
    return changes;
  }

  getCoinsCount() {
    return this.#coins;
  }

  setUserMoney(money) {
    this.#userMoney = money;
  }

  getUserMoney() {
    return this.#userMoney;
  }
}

module.exports = VendingMachine;
