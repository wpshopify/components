/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';
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
  const { useContext, useEffect, useRef, Suspense } = wp.element;
  const [itemsState] = useContext(ItemsContext);
  const [productState, productDispatch] = useContext(ProductContext);
  const isFirstRender = useRef(true);

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${itemsState.payloadSettings.isSingleComponent ? '0px' : '15px'};
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
            productState={productState}
            productDispatch={productDispatch}
            itemsState={itemsState}
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
    findPortalElement(itemsState.payloadSettings.dropzoneProductBuyButton)
  );
}

export default wp.element.memo(ProductBuyButton);
