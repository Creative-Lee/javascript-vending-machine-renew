const MoneyValidation = {
  isDivisibleByMinimumUnitPrice(amount) {
    return Number(amount) % 10 === 0;
  },
};

module.exports = MoneyValidation;
