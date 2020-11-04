/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ProductVariant from './variant';
import ProductVariantDropdownValue from '../dropdown-value';
import { ProductOptionContext } from '../_state/context';
import { useOnClickOutside } from '../../../../../../common/hooks';
import { createObj, isPairMatch } from '../../../../../../common/utils';
import { v4 as uuidv4 } from 'uuid';
import isEmpty from 'lodash/isEmpty';

function ProductVariantsDropdown({
  availableVariants,
  dropdownElement,
  isDropdownOpen,
  selectedOptions,
  option,
  isOptionSelected,
}) {
  const { useContext } = wp.element;
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);

  function isAvail(variant) {
    const selectedVariant = createObj(variant.name, variant.value);
    return isPairMatch(availableVariants, selectedVariant) || isOptionSelected;
  }

  useOnClickOutside(
    dropdownElement,
    () => {
      productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: false });
    },
    isDropdownOpen
  );

  const modalCSS = css`
    && {
      list-style: none;
      padding: 0;
      margin: 0;
      background-color: #fff;
      width: 100%;
      max-width: 100%;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 400px;
    }
  `;

  return (
    <ul className='wps-modal wps-variants' css={modalCSS}>
      {option &&
        option.values.length &&
        option.values.map(
          (variant) =>
            (isAvail(variant) || isEmpty(selectedOptions)) && (
              <ProductVariant
                key={uuidv4()}
                variant={variant}
                availableVariants={availableVariants}
                selectedOptions={selectedOptions}>
                <ProductVariantDropdownValue />
              </ProductVariant>
            )
        )}
    </ul>
  );
}

export default ProductVariantsDropdown;
