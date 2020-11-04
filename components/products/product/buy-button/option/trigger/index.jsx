/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useAnime, pulse } from '../../../../../../common/animations';
import { FilterHook } from '../../../../../../common/utils';
import { buttonCSS, IconCSS } from '../../../../../../common/css';
import { ItemsContext } from '../../../../../items/_state/context';
import { ProductOptionContext } from '../_state/context';

function TriggerIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 30 30'
      style={{ maxWidth: '19px', position: 'absolute', right: '16px', top: 'calc(50% - 9px)' }}>
      <path fill='#fff' d='M15 17.8L3.2 6 .7 8.7 15 23 29.3 8.7 26.8 6z' />
    </svg>
  );
}

function ProductOptionTrigger({ missingSelections }) {
  const { useEffect, useContext, useRef } = wp.element;
  const [itemsState] = useContext(ItemsContext);
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);

  const dropdownTrigger = useRef();
  const animePulse = useAnime(pulse);
  const isFirstRender = useRef(true);

  function onClick() {
    wp.hooks.doAction('before.product.variantDropdown.toggle', productOptionState);

    productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: !productOptionState.isDropdownOpen });
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!missingSelections) {
      return;
    }

    if (!isOptionSelected()) {
      animePulse(dropdownTrigger.current);
    }
  }, [missingSelections]);

  function isOptionSelected() {
    return productOptionState.isOptionSelected;
  }

  function optionName() {
    return productOptionState.option.name;
  }

  function getOptionName(selectedOption, option) {
    return selectedOption[option.name];
  }

  function getSelectedOption() {
    return productOptionState.selectedOption;
  }

  function optionNameWithSelect() {
    return optionName() + ': ' + getOptionName(getSelectedOption(), productOptionState.option);
  }

  function displayOptionName() {
    return isOptionSelected() ? optionNameWithSelect() : optionName();
  }

  const variantDropdownCSS = css`
    && {
      background-color: ${itemsState.payloadSettings.variantButtonColor};
      color: ${itemsState.payloadSettings.variantDropdownTextColor};
      font-family: ${itemsState.variantDropdownTypeFontFamily
        ? itemsState.variantDropdownTypeFontFamily
        : 'inherit'};
      font-weight: ${itemsState.variantDropdownTypeFontWeight
        ? itemsState.variantDropdownTypeFontWeight
        : 'initial'};
      font-size: ${itemsState.variantDropdownTypeFontSize
        ? itemsState.variantDropdownTypeFontSize
        : 'initial'};
      letter-spacing: ${itemsState.variantDropdownTypeLetterSpacing
        ? itemsState.variantDropdownTypeLetterSpacing
        : 'initial'};
      line-height: ${itemsState.variantDropdownTypeLineHeight
        ? itemsState.variantDropdownTypeLineHeight
        : 'initial'};
      text-decoration: ${itemsState.variantDropdownTypeTextDecoration
        ? itemsState.variantDropdownTypeTextDecoration
        : 'initial'};
      text-transform: ${itemsState.variantDropdownTypeTextTransform
        ? itemsState.variantDropdownTypeTextTransform
        : 'initial'};
    }
  `;

  return (
    <button
      className='wps-btn wps-icon wps-icon-dropdown wps-modal-trigger'
      onClick={onClick}
      ref={dropdownTrigger}
      css={[IconCSS, buttonCSS, variantDropdownCSS]}>
      <FilterHook name='products.option.title.text'>{displayOptionName()}</FilterHook>
      <TriggerIcon />
    </button>
  );
}

export default ProductOptionTrigger;
