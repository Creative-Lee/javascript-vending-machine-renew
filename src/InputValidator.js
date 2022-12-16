const InputValidator = {
  validateVendingMachineMoney(money) {
    if (isNaN(money)) {
      throw new Error("[ERROR] 금액은 숫자로 입력해야 합니다.");
    }
    if (Number(money) % 10 !== 0) {
      throw new Error("[ERROR] 금액은 10원 단위로 입력해야 합니다.");
    }
  },

  validateProductForm(product) {
    if (isNaN(product[1])) throw new Error("[ERROR] 상품의 가격은 숫자 형식으로 입력해야 합니다.");
    if (Number(product[1]) < 100 && Number(product[1]) % 10 !== 0)
      throw new Error("[ERROR] 상품의 가격은 100원부터 시작해야 하며, 10원 단위로 나누어 떨어져야 합니다.");
    if (isNaN(product[2])) throw new Error("[ERROR] 상품의 개수는 숫자 형식으로 입력해야 합니다.");
  },

  validateUserMoney(money) {
    if (isNaN(money)) {
      throw new Error("[ERROR] 투입 금액은 숫자 형식이어야 합니다.");
    }
  },

  validateAvailablePurchase(product, userMoney) {
    if (product.count <= 0) {
      throw new Error("[ERROR] 해당 상품은 품절되었습니다.");
    }
    if (product.price > userMoney) {
      throw new Error("[ERROR] 금액이 부족합니다.");
    }
  },
};

module.exports = InputValidator;
