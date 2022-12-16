const InputView = require('./views/InputView');

class MachineController {
  play() {
    this.#requestMachineAmountMoney();
  }

  #requestMachineAmountMoney() {
    InputView.readMachineAmountMoney((machineAmountMoney) => {});
  }
}

module.exports = MachineController;
