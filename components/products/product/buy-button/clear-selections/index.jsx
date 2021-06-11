/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { slideInFromBottom } from '../../../../../common/css';

function ClearSelections({ productDispatch, variantStyle }) {
  const ClearSelectionsCSS = css`
    position: absolute;
    right: 0;
    font-size: 14px;
    text-decoration: underline;
    top: ${variantStyle === 'dropdown' ? '-50px' : '-5px'};
    padding: 5px 0;

    &:hover {
      cursor: pointer;
    }
  `;

  function onClear() {
    productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });
    productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false });
    productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false });
    productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
    productDispatch({
      type: 'SET_AVAILABLE_VARIANTS',
      payload: [],
    });
  }

  return (
    <p css={[ClearSelectionsCSS, slideInFromBottom]} onClick={onClear}>
      Clear selections
    </p>
  );
}

export default ClearSelections;
