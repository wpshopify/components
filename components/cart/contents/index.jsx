/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartLineItems } from '../lineitems';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { getCache } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';

function filterEmptyLineItems(lineItems) {
  return lineItems.filter(Boolean);
}

function CartContents(props) {
  const { useState } = wp.element;

  const [inventory] = useState(() => {
    var inv = getCache('wps-inventory-levels');
    if (inv) {
      return JSON.parse(inv);
    }

    return false;
  });

  const CartTitleCSS = css`
    top: 45%;
    text-align: center;
    color: #ddd;
    position: absolute;
    margin: 0;
    width: 100%;
    font-size: 2em;
    margin: 0;
    text-align: center;
  `;

  const CartContentsCSS = css`
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    padding-top: 3.5em;
    position: relative;
    flex: 1;

    > .wps-notice {
      position: relative;
      top: 30%;
    }

    &[data-is-cart-empty='true'] .wps-notice-info {
      background: none;
      border: none;
      font-size: 24px;
    }
  `;

  const AddSomethingCSS = css`
    display: block;
    margin-top: 12px;
    color: #ddd;
    font-size: 20px;
  `;

  return (
    <section
      className='wps-cart-contents'
      data-is-cart-empty={props.isCartEmpty}
      css={CartContentsCSS}>
      {props.isCartEmpty ? (
        <h2 css={CartTitleCSS}>
          <FilterHook name='cart.empty.text'>
            {wp.i18n.__('Your cart is empty!', 'wpshopify')}
          </FilterHook>

          <FilterHook name='cart.empty.addSomethingText'>
            <a
              href={wp.hooks.applyFilters(
                'cart.empty.addSomethingLink',
                wpshopify.settings.general.urlProducts
              )}
              css={AddSomethingCSS}>
              {wp.i18n.__('Go add something awesome', 'wpshopify')}
            </a>
          </FilterHook>
        </h2>
      ) : (
        <CartLineItems
          inventory={inventory}
          lineItems={filterEmptyLineItems(props.checkoutCache.variants)}
        />
      )}
    </section>
  );
}

export default CartContents;
