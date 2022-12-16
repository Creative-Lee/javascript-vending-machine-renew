const MachineController = require('./MachineController');

class App {
  play() {
    new MachineController().play();
  }
}

new App().play();

module.exports = App;
