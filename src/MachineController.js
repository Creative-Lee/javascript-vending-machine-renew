const InputView = require('./views/InputView');
const Validation = require('./validation');

class MachineController {
  play() {
    this.#requestMachineMoneyAmount();
  }

  #requestMachineMoneyAmount() {
    InputView.readMachineAmountMoney((machineMoneyAmount) => {
      Validation.validateMachineMoneyAmount(machineMoneyAmount);
    });
  }
}

module.exports = MachineController;
