function StockStatusInline({ inStock }) {
  return inStock ? <p>In Stock</p> : <p>Out of stock (Notify me when it's avaialble)</p>;
}

export default StockStatusInline;
