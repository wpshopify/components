/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductOptionContext } from '../_state/context';
import { useOnClickOutside } from '../../../../../../common/hooks';
import ProductVariant from './variant';
import ProductVariantDropdownValue from '../dropdown-value';

function ProductVariantsDropdown({
  availableVariants,
  dropdownElement,
  isDropdownOpen,
  selectedOptions,
  option,
}) {
  const { useContext } = wp.element;
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);

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
      {option.values.map((variant) => (
        <ProductVariant
          key={variant.name + variant.value}
          variant={variant}
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          variants={productOptionState.variants}>
          <ProductVariantDropdownValue />
        </ProductVariant>
      ))}
    </ul>
  );
}

export default ProductVariantsDropdown;
