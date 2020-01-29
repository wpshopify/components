function shopActive() {
  if (!wpshopify.shop) {
    return false
  } else {
    return true
  }
}

function getShop() {
  return wpshopify.shop
}

function setShop(shop) {
  if (!shopActive()) {
    wpshopify.shop = shop
  }
}

function getMoneyFormat(shop) {
  return shop.moneyFormat
}

export { getMoneyFormat, getShop, setShop }
