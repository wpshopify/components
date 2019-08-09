function shopActive() {
   if (!WP_Shopify.shop) {
      return false
   } else {
      return true
   }
}

function getShop() {
   return WP_Shopify.shop
}

function setShop(shop) {
   if (!shopActive()) {
      WP_Shopify.shop = shop
   }
}

function getMoneyFormat(shop) {
   return shop.moneyFormat
}

export { getMoneyFormat, getShop, setShop }
