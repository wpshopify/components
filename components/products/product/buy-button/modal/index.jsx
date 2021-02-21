/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Modal from 'react-modal';
import { Products } from '../../../index';
import { Items } from '../../../../items';
import { ProductContext } from '../../_state/context';
import { ItemsContext } from '../../../../items/_state/context';
import { usePayloadSettings } from '../../../../../common/hooks';

Modal.setAppElement('#wpshopify-root');

function htmlTemp() {
  return `
      <div class="wps-modal-row" style="display: flex;">
         <div style="width: 60%;padding: 0px 3em 0px 1em;">
            <ProductImages />
         </div>
         <div style="width: 40%;padding-right: 1em;">
            <ProductTitle />
            <ProductPricing />
            <ProductDescription />
            <ProductBuyButton />
         </div>
      </div>
   `;
}

function customModalSettings() {
  return wp.hooks.applyFilters('product.modal.settings', {
    titleTypeFontSize: '32px',
    linkTo: 'none',
    htmlTemplate: htmlTemp(),
    fullWidth: true,
    showFeaturedOnly: false,
    showZoom: true,
  });
}

function ProductModal() {
  const { useContext } = wp.element;
  const [productState, productDispatch] = useContext(ProductContext);
  const [itemsState] = useContext(ItemsContext);
  const payloadSettings = usePayloadSettings(itemsState, customModalSettings());

  const customStyles = {
    overlay: {
      background: 'rgb(138 138 138 / 70%)',
      transition: 'all 0.1s ease',
    },
    content: {
      maxWidth: '1100px',
      width: '1100px',
      margin: '0 auto',
      borderRadius: '10px',
      border: '1px solid #b6b6b6',
      padding: '30px',
      background: '#f6f9fc',
      height: '80vh',
      left: '50%',
      overflow: 'visible',
      boxShadow: '0 7px 14px 0 rgba(60,66,87,.08), 0 3px 6px 0 rgba(0,0,0,.12)',
    },
  };

  function onModalClose() {
    productDispatch({ type: 'TOGGLE_MODAL', payload: false });
  }

  return (
    <Modal
      closeTimeoutMS={50}
      isOpen={productState.isModalOpen}
      onRequestClose={onModalClose}
      contentLabel='Example Modal'
      style={customStyles}
      bodyOpenClassName='wps-modal-open'>
      <ProductModalContent payload={productState.payload} payloadSettings={payloadSettings} />
    </Modal>
  );
}

function ProductModalCloseIcon() {
  const { useContext } = wp.element;
  const [productState, productDispatch] = useContext(ProductContext);

  const ProductModalCloseIconCSS = css`
    position: absolute;
    top: -18px;
    width: 70px;
    padding: 15px;
    height: 70px;
    right: -66px;
    z-index: 99999999;
    opacity: 1;
    transition: opacity 0.2s ease;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }

    path {
      fill: white;
    }
  `;

  function onModalClose() {
    productDispatch({ type: 'TOGGLE_MODAL', payload: false });
  }

  return (
    <svg
      focusable='false'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 320 512'
      css={ProductModalCloseIconCSS}
      onClick={onModalClose}>
      <path
        fill='currentColor'
        d='M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z'></path>
    </svg>
  );
}

function ProductModalContent({ payload, payloadSettings }) {
  const ProductModalCSS = css`
    height: 100%;
  `;

  const ProductModalContentInnerCSS = css`
    overflow: scroll;
    height: 100%;
  `;

  return (
    <div className='wps-modal' css={ProductModalCSS}>
      <ProductModalCloseIcon />
      <div className='wps-modal-inner' css={ProductModalContentInnerCSS}>
        <Items
          options={[
            {
              payloadSettings: payloadSettings,
              payload: payload,
            },
          ]}>
          <Products />
        </Items>
      </div>
    </div>
  );
}

function ProductModalButton() {
  return <ProductModal />;
}

export default ProductModalButton;
