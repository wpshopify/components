/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useAnime, pulse } from '../../../../../../common/animations';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { buttonCSS, IconCSS } from '../../../../../../common/css';
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

    if (!productOptionState.isOptionSelected) {
      animePulse(dropdownTrigger.current);
    }
  }, [missingSelections]);

  function getOptionName(selectedOption, option) {
    return selectedOption[option.name];
  }

  function getSelectedOption() {
    return productOptionState.selectedOption;
  }

  function optionNameWithSelect() {
    return (
      productOptionState.option.name +
      ': ' +
      getOptionName(getSelectedOption(), productOptionState.option)
    );
  }

  function displayOptionName() {
    return productOptionState.isOptionSelected
      ? optionNameWithSelect()
      : productOptionState.option.name;
  }

  const variantDropdownCSS = css`
    && {
      background-color: ${productOptionState.payloadSettings.variantButtonColor
        ? productOptionState.payloadSettings.variantButtonColor
        : 'black'};
      color: ${productOptionState.payloadSettings.variantDropdownTextColor
        ? productOptionState.payloadSettings.variantDropdownTextColor
        : 'white'};
      font-family: ${productOptionState.payloadSettings.variantDropdownTypeFontFamily
        ? productOptionState.payloadSettings.variantDropdownTypeFontFamily
        : 'inherit'};
      font-weight: ${productOptionState.payloadSettings.variantDropdownTypeFontWeight
        ? productOptionState.payloadSettings.variantDropdownTypeFontWeight
        : 'initial'};
      font-size: ${productOptionState.payloadSettings.variantDropdownTypeFontSize
        ? productOptionState.payloadSettings.variantDropdownTypeFontSize
        : 'initial'};
      letter-spacing: ${productOptionState.payloadSettings.variantDropdownTypeLetterSpacing
        ? productOptionState.payloadSettings.variantDropdownTypeLetterSpacing
        : 'initial'};
      line-height: ${productOptionState.payloadSettings.variantDropdownTypeLineHeight
        ? productOptionState.payloadSettings.variantDropdownTypeLineHeight
        : 'initial'};
      text-decoration: ${productOptionState.payloadSettings.variantDropdownTypeTextDecoration
        ? productOptionState.payloadSettings.variantDropdownTypeTextDecoration
        : 'initial'};
      text-transform: ${productOptionState.payloadSettings.variantDropdownTypeTextTransform
        ? productOptionState.payloadSettings.variantDropdownTypeTextTransform
        : 'initial'};
    }
  `;

  return (
    <button
      className='wps-btn wps-icon wps-icon-dropdown wps-modal-trigger'
      onClick={onClick}
      ref={dropdownTrigger}
      css={[IconCSS, buttonCSS, variantDropdownCSS]}
      aria-label='Product Variant Dropdown'>
      <FilterHook name='products.option.title.text'>{displayOptionName()}</FilterHook>
      <TriggerIcon />
    </button>
  );
}

export default ProductOptionTrigger;
