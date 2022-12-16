const NumberValidation = {
  hasOnlyNumber(input) {
    const inputArr = input.split('');
    const numberArr = inputArr.map((eachLetter) => parseInt(eachLetter));

    return numberArr.every(Number.isInteger);
  },
};

module.exports = NumberValidation;
