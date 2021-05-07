/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement, FilterHook } from '../../../../common/utils';
import { hasLink } from '../../../../common/settings';

const Link = wp.element.lazy(() => import(/* webpackChunkName: 'Link-public' */ '../../../link'));

function ProductTitle({ payloadSettings, payload }) {
  const { useContext } = wp.element;

  const titleStyles = css`
    && {
      font-family: ${payloadSettings.titleTypeFontFamily
        ? payloadSettings.titleTypeFontFamily
        : 'inherit'};
      font-weight: ${payloadSettings.titleTypeFontWeight
        ? payloadSettings.titleTypeFontWeight
        : 'initial'};
      font-size: ${payloadSettings.titleTypeFontSize
        ? payloadSettings.titleTypeFontSize
        : payloadSettings.titleSize};
      letter-spacing: ${payloadSettings.titleTypeLetterSpacing
        ? payloadSettings.titleTypeLetterSpacing
        : 'initial'};
      line-height: ${payloadSettings.titleTypeLineHeight
        ? payloadSettings.titleTypeLineHeight
        : 'initial'};
      text-decoration: ${payloadSettings.titleTypeTextDecoration
        ? payloadSettings.titleTypeTextDecoration
        : 'initial'};
      text-transform: ${payloadSettings.titleTypeTextTransform
        ? payloadSettings.titleTypeTextTransform
        : 'initial'};

      color: ${payloadSettings.titleColor};
      white-space: normal;
      margin: 0;
    }
  `;

  const titleStylesWrapper = css`
    margin-bottom: ${payloadSettings.isSingleComponent ? '0px' : '15px'};
  `;

  function getTitleClass() {
    return wp.hooks.applyFilters('product.title.class', 'wps-products-title');
  }

  return usePortal(
    <div
      className='wps-component wps-component-products-title'
      data-wps-component-order='0'
      css={titleStylesWrapper}>
      {hasLink(payloadSettings) ? (
        <Link
          type='products'
          payload={payload}
          target={payloadSettings.linkTarget}
          linkTo={payloadSettings.linkTo}>
          <Title
            styles={titleStyles}
            title={payload.title}
            classList={getTitleClass()}
            product={payload}
          />
        </Link>
      ) : (
        <Title
          styles={titleStyles}
          title={payload.title}
          classList={getTitleClass()}
          product={payload}
        />
      )}
    </div>,
    findPortalElement(payloadSettings.dropzoneProductTitle)
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
