import { ProductContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement, FilterHook } from '../../../../common/utils';
import { Link } from '../../../link';
import { hasLink } from '../../../../common/settings';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const { useContext } = wp.element;

function ProductTitle() {
  const [productState] = useContext(ProductContext);
  const [itemsState] = useContext(ItemsContext);

  const titleStyles = css`
    && {
      font-family: ${itemsState.payloadSettings.titleTypeFontFamily
        ? itemsState.payloadSettings.titleTypeFontFamily
        : 'inherit'};
      font-weight: ${itemsState.payloadSettings.titleTypeFontWeight
        ? itemsState.payloadSettings.titleTypeFontWeight
        : 'initial'};
      font-size: ${itemsState.payloadSettings.titleTypeFontSize
        ? itemsState.payloadSettings.titleTypeFontSize
        : itemsState.payloadSettings.titleSize};
      letter-spacing: ${itemsState.payloadSettings.titleTypeLetterSpacing
        ? itemsState.payloadSettings.titleTypeLetterSpacing
        : 'initial'};
      line-height: ${itemsState.payloadSettings.titleTypeLineHeight
        ? itemsState.payloadSettings.titleTypeLineHeight
        : 'initial'};
      text-decoration: ${itemsState.payloadSettings.titleTypeTextDecoration
        ? itemsState.payloadSettings.titleTypeTextDecoration
        : 'initial'};
      text-transform: ${itemsState.payloadSettings.titleTypeTextTransform
        ? itemsState.payloadSettings.titleTypeTextTransform
        : 'initial'};

      color: ${itemsState.payloadSettings.titleColor};
      white-space: normal;
      margin: 0;
    }
  `;

  const titleStylesWrapper = css`
    margin-bottom: ${itemsState.payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

  function getTitleClass() {
    return wp.hooks.applyFilters('product.title.class', 'wps-products-title');
  }

  return usePortal(
    <div
      className='wps-component wps-component-products-title'
      data-wps-component-order='0'
      css={titleStylesWrapper}>
      {hasLink(itemsState.payloadSettings) ? (
        <Link
          type='products'
          payload={productState.payload}
          target={itemsState.payloadSettings.linkTarget}
          linkTo={itemsState.payloadSettings.linkTo}>
          <Title
            styles={titleStyles}
            title={productState.payload.title}
            classList={getTitleClass()}
            product={productState.payload}
          />
        </Link>
      ) : (
        <Title
          styles={titleStyles}
          title={productState.payload.title}
          classList={getTitleClass()}
          product={productState.payload}
        />
      )}
    </div>,
    findPortalElement(itemsState.payloadSettings.dropzoneProductTitle)
  );
}

function Title(props) {
  return (
    <>
      <FilterHook name='before.product.title' hasHTML={true} args={[props.product]} />

      <h2 itemProp='name' className={props.classList} css={props.styles}>
        <FilterHook name='product.title.text'>{props.title}</FilterHook>
      </h2>

      <FilterHook name='after.product.title' hasHTML={true} args={[props.product]} />
    </>
  );
}

export default ProductTitle;
