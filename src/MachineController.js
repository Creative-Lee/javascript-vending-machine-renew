const InputView = require('./views/InputView');
const Validation = require('./validation');

class MachineController {
  play() {
    this.#requestMachineAmountMoney();
  }

  #requestMachineAmountMoney() {
    InputView.readMachineAmountMoney((machineAmountMoney) => {
      Validation.validateMachineMoneyAmount(machineAmountMoney);
    });
  }
}

module.exports = MachineController;
