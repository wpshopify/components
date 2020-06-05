/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function StorefrontFilterOptionsGroupItemValue({
  itemValue,
  itemType,
  displayStyle,
  onClick,
  isSelected,
}) {
  const checkboxCSS = css`
    opacity: 1;
    margin-right: 10px;
    margin-top: 3px;
    display: block;
    position: static;
    width: 16px;
    height: 16px;
  `

  const labelCSS = css`
    display: block;
    position: static;
    flex: 1;
    text-transform: capitalize;
  `

  const checkboxWrapperCSS = css`
    display: flex;

    &:hover {
      cursor: pointer;

      label,
      input {
        cursor: pointer;
      }
    }
  `

  return displayStyle === 'checkbox' ? (
    <li
      data-wps-is-current={isSelected}
      data-wps-is-selected={isSelected}
      data-wps-filter-value={itemValue}
      data-wps-display-style={displayStyle}
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
  ) : (
    itemValue && (
      <li
        data-wps-is-current={isSelected}
        data-wps-is-selected={isSelected}
        data-wps-filter-value={itemValue}
        data-wps-display-style={displayStyle}
        className={'wps-' + itemType + '-single wps-filter-single'}
        onClick={onClick}>
        {itemValue}
      </li>
    )
  )
}

export default wp.element.memo(StorefrontFilterOptionsGroupItemValue)
