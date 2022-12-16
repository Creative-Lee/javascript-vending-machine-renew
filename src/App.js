const MissionUtils = require("@woowacourse/mission-utils");
const InputValidator = require("./InputValidator");
const InputView = require("./InputView");
const OutputView = require("./OutputView");
const VendingMachine = require("./VendingMachine");

class App {
  #vendingMachine;

  play() {
    this.requestVendingMachineCoin();
  }

  requestVendingMachineCoin() {
    InputView.readVendingMachineMoney((money) => {
      this.errorHandling(() => {
        InputValidator.validateVendingMachineMoney(money);
        this.#vendingMachine = new VendingMachine(money);
        OutputView.printVendingMachineCoins(this.#vendingMachine.getCoinsCount());
        this.requestProducts();
      }, this.requestVendingMachineCoin.bind(this));
    });
  }

  requestProducts() {
    InputView.readProductList((products) => {
      this.errorHandling(() => {
        products.split(";").forEach((product) => this.#vendingMachine.addProduct(product));
        this.requestUserMoney();
      }, this.requestProducts.bind(this));
    });
  }

  requestUserMoney() {
    InputView.readUserMoney((money) => {
      this.errorHandling(() => {
        InputValidator.validateUserMoney(money);
        this.#vendingMachine.setUserMoney(money);
        this.requestProductName();
      }, this.requestUserMoney.bind(this));
    });
  }

  requestProductName() {
    OutputView.printCurrentUserMoney(this.#vendingMachine.getUserMoney());
    InputView.readProductName((productName) => {
      this.errorHandling(() => {
        this.#vendingMachine.purchaseProduct(productName);
        if (this.#vendingMachine.isAvailablePurchase()) this.requestProductName();
        if (!this.#vendingMachine.isAvailablePurchase()) this.end();
      }, this.requestProductName.bind(this));
    });
  }

  end() {
    OutputView.printCurrentUserMoney(this.#vendingMachine.getUserMoney());
    OutputView.printChanges(this.#vendingMachine.getChanges());
    MissionUtils.Console.close();
  }

  errorHandling(callback, request) {
    try {
      callback();
    } catch (error) {
      OutputView.printErrorMessage(error);
      request();
    }
  }
}

const app = new App();
app.play();

module.exports = App;
