/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { slideInFromTop } from '../../../../../common/css';

function ClearSelections({ productDispatch }) {
  const ClearSelectionsCSS = css`
    position: absolute;
    right: 0;
    font-size: 14px;
    text-decoration: underline;
    top: -5px;
    padding: 5px 0;

    &:hover {
      cursor: pointer;
    }
  `;

  function onClear() {
    productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });
    productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false });
    productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
  }

  return (
    <p css={[ClearSelectionsCSS, slideInFromTop]} onClick={onClear}>
      Clear selections
    </p>
  );
}

export default ClearSelections;
