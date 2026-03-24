const cartRepository = require("../repositories/cartRepository");
const itemRepository = require("../repositories/itemRepository");

const getCart = async () => {
  return cartRepository.getCartRows();
};

const addAppleToCart = async () => {
  const item = await itemRepository.getItemByName("Apple");

  if (!item) {
    throw new Error("Apple not found in items table");
  }

  return cartRepository.upsertCartItem(item.name, item.value);
};

module.exports = {
  getCart,
  addAppleToCart,
};
