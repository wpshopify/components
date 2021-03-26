/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function StorefrontFilterOptionsGroupItemValue({
  itemValue,
  itemType,
  displayStyle,
  onClick,
  isSelected,
}) {
  return displayStyle === 'checkbox' ? (
    <CheckboxItem
      isSelected={isSelected}
      itemValue={itemValue}
      itemType={itemType}
      onClick={onClick}
    />
  ) : (
    <ButtonItem
      isSelected={isSelected}
      itemValue={itemValue}
      itemType={itemType}
      onClick={onClick}
    />
  );
}

function CheckboxItem({ isSelected, itemValue, itemType, onClick }) {
  const labelCSS = css`
    display: block;
    position: static;
    flex: 1;
    text-transform: capitalize;
  `;

  const checkboxWrapperCSS = css`
    display: flex;

    &:hover {
      cursor: pointer;

      label,
      input {
        cursor: pointer;
      }
    }
  `;

  const checkboxCSS = css`
    opacity: 1;
    margin-right: 10px;
    margin-top: 3px;
    display: block;
    position: static;
    width: 16px;
    height: 16px;
  `;

  return (
    <li
      data-wps-is-current={isSelected}
      data-wps-is-selected={isSelected}
      data-wps-filter-value={itemValue}
      data-wps-display-style='checkbox'
      className={'wps-' + itemType + '-single wps-filter-single'}
      css={checkboxWrapperCSS}>
      <input
        id={'input-' + itemValue}
        type='checkbox'
        onChange={onClick}
        checked={isSelected ? 'checked' : ''}
        className='wps-input-value'
        css={checkboxCSS}
      />

      {itemValue && (
        <label htmlFor={'input-' + itemValue} className='wps-input-label' css={labelCSS}>
          {itemValue}
        </label>
      )}
    </li>
  );
}

function ButtonItem({ isSelected, itemValue, itemType, onClick }) {
  const buttonOptionCSS = css`
    padding: 5px 10px;
    background-color: #f2f2f2;
    border: 1px solid #d9d8d8;
    margin: 5px;
    font-size: 15px;
    text-transform: capitalize;
    transition: opacity 0.2s ease;
    backface-visibility: hidden;
    will-change: opacity;
    display: inline-block;

    &:hover {
      cursor: pointer;
      background-color: #eee;
      transform: scale(1.1);
    }

    &[data-wps-is-selected='true'] {
      outline: 3px solid #04d61c;
      outline-offset: -3px;

      &:hover {
        background: #ddfbdd;
        transform: scale(1);
        opacity: 1;
      }
    }
  `;

  return (
    <li
      data-wps-is-current={isSelected}
      data-wps-is-selected={isSelected}
      data-wps-filter-value={itemValue}
      data-wps-display-style='tags'
      className={'wps-' + itemType + '-single wps-filter-single'}
      onClick={onClick}
      css={buttonOptionCSS}>
      {itemValue}
    </li>
  );
}

export default wp.element.memo(StorefrontFilterOptionsGroupItemValue);
