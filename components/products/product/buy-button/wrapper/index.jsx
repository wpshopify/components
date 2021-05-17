import { getButtonText } from '../../../../../common/settings';
import { onlyAvailableOptionsFromVariants } from '../../../../../common/variants';
import ProductQuantity from '../quantity';
import ProductOptions from '../options';
import ProductAddButton from '../add-button';

function ProductBuyButtonWrapper({ payloadSettings, payload, productState, productDispatch }) {
  const isDirectCheckout =
    (payloadSettings.directCheckout || wpshopify.settings.general.directCheckout) &&
    wpshopify.misc.isPro;

  function isHidingControls() {
    if (payloadSettings.linkTo === 'none') {
      return false;
    }

    if ((payloadSettings.isSingular && payloadSettings.postId) || isDirectCheckout) {
      return false;
    }

    if (
      payloadSettings.linkTo === 'shopify' ||
      payloadSettings.linkTo === 'wordpress' ||
      payloadSettings.linkTo === 'modal'
    ) {
      if (payloadSettings.linkWithBuyButton) {
        return false;
      }

      return true;
    }

    return false;
  }

  var buttonText = getButtonText(
    payloadSettings,
    isDirectCheckout,
    payloadSettings.linkWithBuyButton
  );

  return (
    <>
      {payloadSettings.hideQuantity === false && !isHidingControls() && (
        <ProductQuantity
          excludes={payloadSettings.excludes}
          addedToCart={productState.addedToCart}
          minQuantity={payloadSettings.minQuantity}
          maxQuantity={payloadSettings.maxQuantity}
          showLabel={payloadSettings.showQuantityLabel}
          labelText={payloadSettings.quantityLabelText}
        />
      )}
      {productState.hasManyVariants && !isHidingControls() && (
        <ProductOptions
          payloadSettings={payloadSettings}
          missingSelections={productState.missingSelections}
          variantStyle={payloadSettings.variantStyle}
          selectedOptions={productState.selectedOptions}
          availableVariants={productState.availableVariants}
          availableOptions={onlyAvailableOptionsFromVariants(payload.variants)}
          variants={payload.variants}
          showPriceUnderVariantButton={payloadSettings.showPriceUnderVariantButton}
          productDispatch={productDispatch}
        />
      )}

      <ProductAddButton
        payloadSettings={payloadSettings}
        addedToCart={productState.addedToCart}
        isTouched={productState.isTouched}
        hasLink={productState.hasLink}
        allOptionsSelected={productState.allOptionsSelected}
        payload={payload}
        linkTarget={payloadSettings.linkTarget}
        linkTo={payloadSettings.linkTo}
        linkWithBuyButton={payloadSettings.linkWithBuyButton}
        addToCartButtonColor={payloadSettings.addToCartButtonColor}
        addToCartButtonTextColor={payloadSettings.addToCartButtonTextColor}
        isDirectCheckout={isDirectCheckout}
        hasManyVariants={productState.hasManyVariants}
        productDispatch={productDispatch}
        buttonText={buttonText}
        selectedVariant={productState.selectedVariant}
        quantity={productState.quantity}
        selectedOptions={productState.selectedOptions}
      />
    </>
  );
}

export default ProductBuyButtonWrapper;
