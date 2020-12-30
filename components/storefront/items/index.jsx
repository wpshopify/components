import { usePortal } from '../../../common/hooks';
import { Products } from '../../products';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function StorefrontItems({ noResultsText, payloadSettings, payload, queryParams, isLoading }) {
  const { Spinner, Notice } = wp.components;

  const noticeCSS = css`
    && {
      margin-left: 40px;
      margin-top: 0;
    }
  `;

  function buildOptions() {
    return {
      payload: payload,
      products:
        payload &&
        payload.map((product) => {
          return {
            product: product,
            element: false,
            gid: false,
            excludes: false,
            renderFromServer: false,
            selectedVariant: false,
            payloadSettings: {
              pagination: true,
            },
          };
        }),
      dataType: 'products',
      originalParams: {
        type: 'products',
        queryParams: queryParams,
        connectionParams: false,
      },
      type: 'storefront',
      payloadSettings: payloadSettings,
      noResultsText: payloadSettings.noResultsText,
    };
  }

  const spinnerCSS = css`
    position: absolute;
    top: -45px;
    left: 50px;
  `;

  const storefrontItemsWrapperCSS = css`
    position: relative;
  `;

  return usePortal(
    <div css={storefrontItemsWrapperCSS}>
      {isLoading && (
        <div css={spinnerCSS}>
          <Spinner />
        </div>
      )}

      {payload.length ? (
        <Products options={buildOptions()} />
      ) : (
        <Notice css={noticeCSS} status='info' isDismissible={false}>
          {noResultsText}
        </Notice>
      )}
    </div>,
    document.querySelector(payloadSettings.dropzonePayload)
  );
}

export default StorefrontItems;
