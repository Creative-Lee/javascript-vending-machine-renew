const InputView = require('./views/InputView');
const OutputView = require('./views/OutputView');
const VendingMachine = require('./VendingMachine.js');
const { validateMachineMoneyAmount, validateProductInfo } = require('./validation/index.js');
const inputErrorHandler = require('./utils/inputErrorHandler.js');
const generateCoinList = require('./utils/generateCoinList.js');

class MachineController {
  #vendingMachine;

  play() {
    this.#requestMachineMoneyAmount();
  }

  #requestMachineMoneyAmount() {
    InputView.readMachineMoneyAmount((machineMoneyAmount) => {
      const isValidInput = inputErrorHandler(validateMachineMoneyAmount, machineMoneyAmount);

      if (!isValidInput) {
        this.#requestMachineMoneyAmount();
        return;
      }

      this.#chargeMachineCoinPhase(machineMoneyAmount);
    });
  }

  #chargeMachineCoinPhase(machineMoneyAmount) {
    const coinList = generateCoinList(machineMoneyAmount);
    this.#vendingMachine = new VendingMachine(coinList);

    OutputView.printMachineCoinList(coinList);

    this.#requestProductInfo();
  }

  #requestProductInfo() {
    InputView.readProductInfo((productsInfo) => {
      const isValidInput = inputErrorHandler(validateProductInfo, productsInfo);

      if (!isValidInput) {
        this.#requestProductInfo();
        return;
      }

      this.#productManagePhase(productsInfo);
    });
  }

  #productManagePhase(productsInfo) {
    productsInfo.split(';').forEach((productInfo) => this.#vendingMachine.addProduct(productInfo));
  }
}

module.exports = MachineController;
