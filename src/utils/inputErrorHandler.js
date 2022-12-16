const { Console } = require('@woowacourse/mission-utils');

const inputErrorHandler = (validateFunc, input) => {
  try {
    validateFunc(input);
    return true;
  } catch ({ message }) {
    Console.print(message);
    return false;
  }
};

module.exports = inputErrorHandler;
