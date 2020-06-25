import ProductOption from '../option'

function ProductVariantDropdowns({ options }) {
  return (
    <div className='wps-component wps-component-products-options'>
      {options && options.map((option) => <ProductOption key={option.name} option={option} />)}
    </div>
  )
}

export default ProductVariantDropdowns
