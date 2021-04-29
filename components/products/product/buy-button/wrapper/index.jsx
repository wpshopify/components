import { getButtonText } from '../../../../../common/settings';
import { onlyAvailableOptionsFromVariants } from '../../../../../common/variants';
import ProductQuantity from '../quantity';
import ProductOptions from '../options';
import ProductAddButton from '../add-button';

function ProductBuyButtonWrapper({ itemsState, productState, productDispatch }) {
  const isDirectCheckout =
    (itemsState.payloadSettings.directCheckout || wpshopify.settings.general.directCheckout) &&
    wpshopify.misc.isPro;

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

  return (
    <>
      {itemsState.payloadSettings.hideQuantity === false && !isHidingControls() && (
        <ProductQuantity
          excludes={itemsState.payloadSettings.excludes}
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
          productDispatch={productDispatch}
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
  );
}

export default ProductBuyButtonWrapper;
