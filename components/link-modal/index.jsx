import { ProductContext } from '../products/product/_state/context';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function LinkModal({ children }) {
  const [, productDispatch] = wp.element.useContext(ProductContext);
  const LinkModalCSS = css`
    text-decoration: none;
    display: block;

    &:hover {
      cursor: pointer;
    }
  `;

  function onClick() {
    if (wpshopify.misc.isPro) {
      productDispatch({ type: 'TOGGLE_MODAL', payload: true });
    }
  }
  return (
    <a href='#!' onClick={onClick} css={LinkModalCSS} className='wps-link-modal'>
      {children}
    </a>
  );
}

export default LinkModal;
