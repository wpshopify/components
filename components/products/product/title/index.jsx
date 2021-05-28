/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement, FilterHook } from '../../../../common/utils';
import { hasLink } from '../../../../common/settings';
import { useProductState } from '../_state/hooks';

const Link = wp.element.lazy(() => import(/* webpackChunkName: 'Link-public' */ '../../../link'));

function ProductTitle() {
  const productState = useProductState();

  const titleStyles = css`
    && {
      font-family: ${productState.payloadSettings.titleTypeFontFamily
        ? productState.payloadSettings.titleTypeFontFamily
        : 'inherit'};
      font-weight: ${productState.payloadSettings.titleTypeFontWeight
        ? productState.payloadSettings.titleTypeFontWeight
        : 'initial'};
      font-size: ${productState.payloadSettings.titleTypeFontSize
        ? productState.payloadSettings.titleTypeFontSize
        : productState.payloadSettings.titleSize};
      letter-spacing: ${productState.payloadSettings.titleTypeLetterSpacing
        ? productState.payloadSettings.titleTypeLetterSpacing
        : 'initial'};
      line-height: ${productState.payloadSettings.titleTypeLineHeight
        ? productState.payloadSettings.titleTypeLineHeight
        : 'initial'};
      text-decoration: ${productState.payloadSettings.titleTypeTextDecoration
        ? productState.payloadSettings.titleTypeTextDecoration
        : 'initial'};
      text-transform: ${productState.payloadSettings.titleTypeTextTransform
        ? productState.payloadSettings.titleTypeTextTransform
        : 'initial'};

      color: ${productState.payloadSettings.titleColor};
      white-space: normal;
      margin: 0;
    }
  `;

  const titleStylesWrapper = css`
    margin-bottom: ${productState.payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

  function getTitleClass() {
    return wp.hooks.applyFilters('product.title.class', 'wps-products-title');
  }

  return usePortal(
    <div
      className='wps-component wps-component-products-title'
      data-wps-component-order='0'
      css={titleStylesWrapper}>
      {hasLink(productState.payloadSettings) ? (
        <Link
          type='products'
          payload={productState.payload}
          target={productState.payloadSettings.linkTarget}
          linkTo={productState.payloadSettings.linkTo}>
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
    findPortalElement(productState.payloadSettings.dropzoneProductTitle)
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

export default wp.element.memo(ProductTitle);
