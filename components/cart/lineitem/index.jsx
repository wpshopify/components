import { CartContext } from '../../cart/_state/context';

import { CartLineItemQuantity } from './quantity';
import CartLineItemPrice from './price';
import { CartLineItemImage } from './image';
import { CartLineItemOutOfStock } from './out-of-stock';
import { CartLineItemTitle } from './title';
import { CartLineItemRemove } from './remove';
import CartLineItemVariantTitle from './variant-title';

const CartLineItemLeftInStock = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemLeftInStock-public' */ './left-in-stock')
);

import { calcLineItemTotal, isAvailable } from '../../../common/products';
import { containerFluidCSS, flexRowCSS, flexColSmallCSS, mq } from '../../../common/css';
import { getCurrencyCodeFromPayload } from '../../../common/pricing/data';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import find from 'lodash/find';

function CartLineItem({ lineItem, inventory }) {
  const { useContext, useState, useRef, useEffect } = wp.element;
  const [cartState, cartDispatch] = useContext(CartContext);
  const [isUpdating] = useState(() => false);
  const [lineItemQuantity, setLineItemQuantity] = useState(() => 0);
  const [lineItemTotal, setLineItemTotal] = useState(() => 0);

  const variantId = useRef(false);
  const lineItemElement = useRef();
  const isFirstRender = useRef(true);
  const lineItemTotalElement = useRef();

  function onRemove(e) {
    cartDispatch({
      type: 'REMOVE_LINE_ITEM',
      payload: {
        lineItem: variantId.current,
        checkoutId: cartState.checkoutId,
      },
    });

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: variantId.current,
          lineItemNewQuantity: 0,
        },
        checkoutId: cartState.checkoutId,
      },
    });

    wp.hooks.doAction('after.cart.lineItem.remove', lineItem, variantId.current);
  }

  function getLineItemFromState() {
    return find(cartState.checkoutCache.lineItems, { variantId: lineItem.id });
  }

  function hasRealVariant() {
    return lineItem.title !== 'Default Title';
  }

  useEffect(() => {
    let lineItemFound = getLineItemFromState();

    if (lineItemFound) {
      variantId.current = lineItemFound.variantId;

      setLineItemQuantity(lineItemFound.quantity);
      setLineItemTotal(calcLineItemTotal(lineItem.price, lineItemFound.quantity));
    }
  }, [cartState.checkoutCache.lineItems]);

  const lineItemStyles = css`
    margin-top: 0;
    margin-bottom: 40px;
    min-height: 100px;
    position: relative;
    display: flex;
    top: -50px;
  `;

  const lineItemTitle = css`
    color: #313131;
    text-decoration: none;
    font-size: 17px;
    position: relative;
    margin: 0;

    &[data-wps-is-empty='true'] {
      margin-bottom: 1em;
    }

    &:hover {
      color: #313131;
    }
  `;

  const cartLineItemContentCSS = css`
    margin-top: 0;
    flex: 1;
    padding-left: 10px;
    padding-bottom: 5px;

    ${mq('small')} {
      padding-bottom: 15px;

      .col-8 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `;

  return (
    <div
      className='wps-cart-lineitem'
      data-wps-is-updating={isUpdating}
      data-wps-is-available={isAvailable(lineItem)}
      ref={lineItemElement}
      css={lineItemStyles}>
      <CartLineItemImage lineItem={lineItem} cartState={cartState} />

      <div className='wps-cart-lineitem-content' css={cartLineItemContentCSS}>
        <div
          css={lineItemTitle}
          className='wps-cart-lineitem-title'
          data-wps-is-empty={hasRealVariant() ? 'false' : 'true'}>
          <div className='wps-cart-lineitem-title-wrapper' css={containerFluidCSS}>
            <div css={flexRowCSS}>
              <CartLineItemTitle lineItem={lineItem} />
              <CartLineItemRemove onRemove={onRemove} />
            </div>
          </div>
        </div>

        {hasRealVariant() && <CartLineItemVariantTitle lineItem={lineItem} />}

        {!isAvailable(lineItem) ? (
          <CartLineItemOutOfStock />
        ) : (
          <div className='wps-cart-lineitem-quantity-wrapper' css={containerFluidCSS}>
            <div css={[flexRowCSS, flexColSmallCSS]}>
              <CartLineItemQuantity
                lineItem={lineItem}
                variantId={variantId}
                lineItemQuantity={lineItemQuantity}
                setLineItemQuantity={setLineItemQuantity}
                isFirstRender={isFirstRender}
                setLineItemTotal={setLineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
              />

              <CartLineItemPrice
                lineItem={lineItem}
                lineItemTotal={lineItemTotal}
                lineItemTotalElement={lineItemTotalElement}
                lineItemQuantity={lineItemQuantity}
                currencyCode={getCurrencyCodeFromPayload(cartState.checkoutCache)}
              />

              {wpshopify.misc.isPro && wp.hooks.applyFilters('misc.show.inventoryLevels', true) && (
                <CartLineItemLeftInStock lineItemId={lineItem.id} inventory={inventory} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { CartLineItem };
