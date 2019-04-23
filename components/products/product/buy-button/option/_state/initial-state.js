function ProductOptionInitialState(options) {
   return {
      isOptionSelected: false,
      option: options.option,
      dropdownElement: options.dropdownElement,
      selectedOption: {},
      isDropdownOpen: false
   }
}

export { ProductOptionInitialState }
