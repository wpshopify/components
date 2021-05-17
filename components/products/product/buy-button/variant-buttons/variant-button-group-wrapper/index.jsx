/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductOptionContext } from '../../option/_state/context';
import ProductVariantMissingSelection from '../missing-selection';
import ProductVariantsButtons from '../variants';

function ProductVariantButtonGroupWrapper({
  option,
  missingSelections,
  selectedOptions,
  availableVariants,
}) {
  const { useRef, useContext } = wp.element;
  const [productOptionState] = useContext(ProductOptionContext);
  const variantGroup = useRef();

  const labelStyles = css`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 15px;
  `;

  const groupStyles = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  `;

  return (
    <div className='wpshopify-variant-buttons-group' css={groupStyles}>
      <label css={labelStyles}>{option.name}</label>
      <div className='wpshopify-variant-buttons' ref={variantGroup}>
        <ProductVariantsButtons
          option={option}
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          variants={productOptionState.variants}
          totalOptions={productOptionState.totalOptions}
          showPriceUnderVariantButton={productOptionState.showPriceUnderVariantButton}
        />
      </div>
      {missingSelections && !productOptionState.isOptionSelected && (
        <ProductVariantMissingSelection productOptionState={productOptionState} />
      )}
    </div>
  );
}

export default ProductVariantButtonGroupWrapper;
