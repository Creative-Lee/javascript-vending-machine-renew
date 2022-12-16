const InputView = require('./views/InputView');
const { validateMachineMoneyAmount } = require('./validation/index.js');
const inputErrorHandler = require('./utils/inputErrorHandler.js');

class MachineController {
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
    });
  }
}

module.exports = MachineController;
