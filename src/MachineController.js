const InputView = require('./views/InputView');
const OutputView = require('./views/OutputView');
const VendingMachine = require('./VendingMachine.js');
const { validateMachineMoneyAmount } = require('./validation/index.js');
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

      this.#chargeMachineCoin(machineMoneyAmount);
    });
  }

  #chargeMachineCoin(machineMoneyAmount) {
    const coinList = generateCoinList(machineMoneyAmount);
    this.#vendingMachine = new VendingMachine(coinList);

    OutputView.printMachineCoinList(coinList);
  }
}

module.exports = MachineController;
