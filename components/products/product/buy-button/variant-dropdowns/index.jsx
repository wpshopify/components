import ProductOption from '../option'

function ProductVariantDropdowns({
  options,
  availableVariants,
  selectedOptions,
  missingSelections,
}) {
  return (
    <div className='wps-component wps-component-products-options'>
      {options &&
        options.map((option) => (
          <ProductOption
            key={option.name}
            option={option}
            availableVariants={availableVariants}
            selectedOptions={selectedOptions}
            missingSelections={missingSelections}
          />
        ))}
    </div>
  )
}

export default ProductVariantDropdowns
