/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { StorefrontSelectionsClear } from './clear';
import { StorefrontSelectionsTypes } from './types';

function StorefrontSelectionsWrapper({ selections }) {
  const StorefrontSelectionsWrapperCSS = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
  `;

  return (
    <div className='wps-filter-selections' css={StorefrontSelectionsWrapperCSS}>
      <StorefrontSelectionsTypes selections={selections} />
      <StorefrontSelectionsClear />
    </div>
  );
}

export { StorefrontSelectionsWrapper };
