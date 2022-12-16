class VendingMachine {
  #coinList;
  #productList;

  constructor(coinList) {
    this.#coinList = coinList;
    this.#productList = [];
  }

  addProduct(productInfo) {
    const productData = productInfo.substring(1, productInfo.length - 1).split(',');
    const dataTypes = ['name', 'price', 'quantity'];
    const data = {};

    dataTypes.forEach((type, idx) => (data[type] = productData[idx]));

    this.#productList.push(data);
  }
}

module.exports = VendingMachine;
