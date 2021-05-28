/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useProductState, useProductDispatch } from '../_state/hooks';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement, FilterHook } from '../../../../common/utils';
import size from 'lodash/size';

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../../notice')
);

const ProductBuyButtonWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButtonWrapper-public' */ './wrapper')
);

function allOptionsSelectedMatch(onlySelectedOptions, product) {
  return size(onlySelectedOptions) === product.options.length;
}

function ProductBuyButton() {
  const { useEffect, useRef, Suspense } = wp.element;

  const productState = useProductState();
  const productDispatch = useProductDispatch();

  const isFirstRender = useRef(true);

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${productState.payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

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
      <Suspense fallback={false}>
        {productState.payload.availableForSale ? (
          <ProductBuyButtonWrapper
            payload={productState.payload}
            productState={productState}
            productDispatch={productDispatch}
            payloadSettings={productState.payloadSettings}
          />
        ) : (
          <FilterHook
            name='products.buyButton.unavailable.html'
            hasHTML={true}
            args={[productState]}>
            <Notice status='warning' isDismissible={false}>
              <FilterHook name='notice.unavailable.text'>
                {wp.i18n.__('Out of stock', 'wpshopify')}
              </FilterHook>
            </Notice>
          </FilterHook>
        )}
      </Suspense>

      <FilterHook name='after.product.buyButton' hasHTML={true} args={[productState]} />
    </div>,
    findPortalElement(productState.payloadSettings.dropzoneProductBuyButton)
  );
}

export default wp.element.memo(ProductBuyButton);
