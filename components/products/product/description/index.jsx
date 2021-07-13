/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { useProductState } from '../_state/hooks';

function ProductDescription() {
  const productState = useProductState();

  const ProductDescriptionCSS = css`
    color: ${productState.payloadSettings.descriptionColor};

    font-family: ${productState.payloadSettings.descriptionTypeFontFamily
      ? productState.payloadSettings.descriptionTypeFontFamily
      : productState.payloadSettings.descriptionFont
      ? productState.payloadSettings.descriptionFont
      : 'inherit'};

    font-weight: ${productState.payloadSettings.descriptionTypeFontWeight
      ? productState.payloadSettings.descriptionTypeFontWeight
      : productState.payloadSettings.descriptionFontWeight
      ? productState.payloadSettings.descriptionFontWeight
      : 'initial'};

    font-size: ${productState.payloadSettings.descriptionTypeFontSize
      ? productState.payloadSettings.descriptionTypeFontSize
      : productState.payloadSettings.descriptionSize};

    letter-spacing: ${productState.payloadSettings.descriptionTypeLetterSpacing
      ? productState.payloadSettings.descriptionTypeLetterSpacing
      : 'initial'};
    line-height: ${productState.payloadSettings.descriptionTypeLineHeight
      ? productState.payloadSettings.descriptionTypeLineHeight
      : 'initial'};
    text-decoration: ${productState.payloadSettings.descriptionTypeTextDecoration
      ? productState.payloadSettings.descriptionTypeTextDecoration
      : 'initial'};
    text-transform: ${productState.payloadSettings.descriptionTypeTextTransform
      ? productState.payloadSettings.descriptionTypeTextTransform
      : 'initial'};

    margin-bottom: ${productState.payloadSettings.isSingleComponent ? '0px' : '20px'};

    p:first-of-type {
      margin-top: 0;
    }
  `;

  function maybeTruncateDescription() {
    if (!productState.payloadSettings.descriptionLength) {
      return productState.payload.descriptionHtml;
    } else {
      return (
        productState.payload.descriptionHtml.substring(
          0,
          productState.payloadSettings.descriptionLength
        ) + ' ...'
      );
    }
  }

  return usePortal(
    <div
      css={ProductDescriptionCSS}
      className='wps-component-products-description'
      aria-label='Product Description'
      itemProp='description'
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    findPortalElement(productState.payloadSettings.dropzoneProductDescription)
  );
}

export default wp.element.memo(ProductDescription);
