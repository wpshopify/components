/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ProductQuantity from './quantity';
import ProductOptions from './options';
import ProductAddButton from './add-button';
import { ProductContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';
import { usePortal } from '../../../../common/hooks';
import { getButtonText } from '../../../../common/settings';
import { onlyAvailableOptionsFromVariants } from '../../../../common/variants';
import { findPortalElement, FilterHook } from '../../../../common/utils';
import { Notice } from '../../../notices';
import size from 'lodash/size';

function allOptionsSelectedMatch(onlySelectedOptions, product) {
  return size(onlySelectedOptions) === product.options.length;
}

function ProductBuyButton() {
  const { useContext, useEffect, useRef } = wp.element;
  const [itemsState] = useContext(ItemsContext);
  const [productState, productDispatch] = useContext(ProductContext);
  const isFirstRender = useRef(true);

  const isDirectCheckout =
    (itemsState.payloadSettings.directCheckout || wpshopify.settings.general.directCheckout) &&
    wpshopify.misc.isPro;

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${itemsState.payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

  function isHidingControls() {
    if (itemsState.payloadSettings.linkTo === 'none') {
      return false;
    }

    if (itemsState.payloadSettings.isSingular || isDirectCheckout) {
      return false;
    }

    if (
      itemsState.payloadSettings.linkTo === 'shopify' ||
      itemsState.payloadSettings.linkTo === 'wordpress' ||
      itemsState.payloadSettings.linkTo === 'modal'
    ) {
      if (itemsState.payloadSettings.linkWithBuyButton) {
        return false;
      }

      return true;
    }

    return false;
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (allOptionsSelectedMatch(productState.selectedOptions, productState.payload)) {
      productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: true });

      productDispatch({
        type: 'SET_SELECTED_VARIANT',
        payload: {
          payload: productState.payload,
          selectedOptions: productState.selectedOptions,
        },
      });

      wp.hooks.doAction('before.product.addToCart', productState);
    } else {
      productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false });
    }
  }, [productState.selectedOptions]);

  return usePortal(
    <div css={buyButtonWrapperCSS} className='wps-component-products-buy-button'>
      <FilterHook name='before.product.buyButton' hasHTML={true} args={[productState]} />

      {productState.payload.availableForSale ? (
        <>
          {itemsState.payloadSettings.hideQuantity === false && !isHidingControls() && (
            <ProductQuantity
              addedToCart={productState.addedToCart}
              minQuantity={itemsState.payloadSettings.minQuantity}
              maxQuantity={itemsState.payloadSettings.maxQuantity}
              showLabel={itemsState.payloadSettings.showQuantityLabel}
              labelText={itemsState.payloadSettings.quantityLabelText}
            />
          )}
          {productState.hasManyVariants && !isHidingControls() && (
            <ProductOptions
              missingSelections={productState.missingSelections}
              variantStyle={itemsState.payloadSettings.variantStyle}
              selectedOptions={productState.selectedOptions}
              availableVariants={productState.availableVariants}
              availableOptions={onlyAvailableOptionsFromVariants(productState.payload.variants)}
              variants={productState.payload.variants}
              showPriceUnderVariantButton={itemsState.payloadSettings.showPriceUnderVariantButton}
            />
          )}

          <ProductAddButton
            payloadSettings={itemsState.payloadSettings}
            addedToCart={productState.addedToCart}
            isTouched={productState.isTouched}
            hasLink={productState.hasLink}
            allOptionsSelected={productState.allOptionsSelected}
            payload={productState.payload}
            linkTarget={itemsState.payloadSettings.linkTarget}
            linkTo={itemsState.payloadSettings.linkTo}
            linkWithBuyButton={itemsState.payloadSettings.linkWithBuyButton}
            addToCartButtonColor={itemsState.payloadSettings.addToCartButtonColor}
            addToCartButtonTextColor={itemsState.payloadSettings.addToCartButtonTextColor}
            isDirectCheckout={isDirectCheckout}
            hasManyVariants={productState.hasManyVariants}
            productDispatch={productDispatch}
            buttonText={getButtonText(
              itemsState.payloadSettings,
              isDirectCheckout,
              itemsState.payloadSettings.linkWithBuyButton
            )}
            selectedVariant={productState.selectedVariant}
            quantity={productState.quantity}
            selectedOptions={productState.selectedOptions}
          />
        </>
      ) : (
        <FilterHook name='products.buyButton.unavailable.html' hasHTML={true} args={[productState]}>
          <Notice status='warning' isDismissible={false}>
            <FilterHook name='notice.unavailable.text'>
              {wp.i18n.__('Out of stock', 'wpshopify')}
            </FilterHook>
          </Notice>
        </FilterHook>
      )}

      <FilterHook name='after.product.buyButton' hasHTML={true} args={[productState]} />
    </div>,
    findPortalElement(itemsState.payloadSettings.dropzoneProductBuyButton)
  );
}

export default wp.element.memo(ProductBuyButton);
