import ProductOption from '../option';

function ProductVariantDropdowns({
  options,
  availableVariants,
  selectedOptions,
  missingSelections,
  variants,
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
            variants={variants}
          />
        ))}
    </div>
  );
}

export default ProductVariantDropdowns;
