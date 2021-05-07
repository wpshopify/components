import ProductOption from '../option';

function ProductVariantDropdowns({
  options,
  availableVariants,
  selectedOptions,
  missingSelections,
  variants,
  payloadSettings,
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
            payloadSettings={payloadSettings}
          />
        ))}
    </div>
  );
}

export default ProductVariantDropdowns;
