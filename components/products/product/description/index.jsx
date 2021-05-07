/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '../../../../common/utils';

function ProductDescription({ payloadSettings, payload }) {
  const ProductDescriptionCSS = css`
    color: ${payloadSettings.descriptionColor};

    font-family: ${payloadSettings.descriptionTypeFontFamily
      ? payloadSettings.descriptionTypeFontFamily
      : payloadSettings.descriptionFont
      ? payloadSettings.descriptionFont
      : 'inherit'};

    font-weight: ${payloadSettings.descriptionTypeFontWeight
      ? payloadSettings.descriptionTypeFontWeight
      : payloadSettings.descriptionFontWeight
      ? payloadSettings.descriptionFontWeight
      : 'initial'};

    font-size: ${payloadSettings.descriptionTypeFontSize
      ? payloadSettings.descriptionTypeFontSize
      : payloadSettings.descriptionSize};

    letter-spacing: ${payloadSettings.descriptionTypeLetterSpacing
      ? payloadSettings.descriptionTypeLetterSpacing
      : 'initial'};
    line-height: ${payloadSettings.descriptionTypeLineHeight
      ? payloadSettings.descriptionTypeLineHeight
      : 'initial'};
    text-decoration: ${payloadSettings.descriptionTypeTextDecoration
      ? payloadSettings.descriptionTypeTextDecoration
      : 'initial'};
    text-transform: ${payloadSettings.descriptionTypeTextTransform
      ? payloadSettings.descriptionTypeTextTransform
      : 'initial'};

    margin-bottom: ${payloadSettings.isSingleComponent ? '0px' : '20px'};

    p:first-of-type {
      margin-top: 0;
    }
  `;

  function maybeTruncateDescription() {
    if (!payloadSettings.descriptionLength) {
      return payload.descriptionHtml;
    } else {
      return payload.descriptionHtml.substring(0, payloadSettings.descriptionLength) + ' ...';
    }
  }

  return usePortal(
    <div
      css={ProductDescriptionCSS}
      className='wps-component-products-description'
      itemProp='description'
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    findPortalElement(payloadSettings.dropzoneProductDescription)
  );
}

export default ProductDescription;
