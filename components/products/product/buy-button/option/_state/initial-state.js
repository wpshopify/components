function ProductOptionInitialState(options) {
  return {
    isOptionSelected: false,
    option: options.option ? options.option : false,
    dropdownElement: options.dropdownElement ? options.dropdownElement : false,
    selectedOption: {},
    isDropdownOpen: false,
    variants: options.variants ? options.variants : false,
    totalOptions: options.totalOptions ? options.totalOptions : false,
    showPriceUnderVariantButton: options.showPriceUnderVariantButton
      ? options.showPriceUnderVariantButton
      : false,
    payloadSettings: options.payloadSettings,
  };
}

export { ProductOptionInitialState };
