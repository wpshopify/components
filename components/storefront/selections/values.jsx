/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { IconRemove } from '../../../common/icons/icon-remove.jsx'
import { StorefrontContext } from '../_state/context'
import { createSelectionsOfType, buildNewSelection } from '../../../common/selections'
import { FilterHook } from '../../../common/utils'

const { useContext } = wp.element

function StorefrontSelectionsValue({ selectionType, val }) {
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

  function onClick(e) {
    const newList = buildNewSelection(val, selectionType, true, storefrontState.selections)

    storefrontDispatch({
      type: 'SET_SELECTIONS',
      payload: createSelectionsOfType(selectionType, newList),
    })

    storefrontDispatch({
      type: 'SET_SELECTED_' + selectionType.toUpperCase(),
      payload: newList,
    })
  }

  const selectionValueCSS = css`
    margin-right: 8px;
    text-transform: capitalize;
    padding: 5px 10px;
    background: #e6e6e6;
    font-size: 16px;
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    .wps-icon {
      width: 10px;
      height: 10px;
      display: inline-block;
      right: 0;
      position: relative;
      top: calc(50% - 16px);
      margin-left: 10px;
    }

    .wps-icon svg {
      width: 10px;
      height: 10px;
      display: inline-block;
      position: relative;
      position: absolute;
      top: -2px;
    }
  `

  return (
    <span className='wps-filter-selection-value wps-mr-2' onClick={onClick} css={selectionValueCSS}>
      {selectionType === 'available_for_sale' ? (
        <FilterHook name='storefront.selections.available.text'>
          {wp.i18n.__('Available for sale', 'wpshopify')}
        </FilterHook>
      ) : (
        val
      )}
      <IconRemove />
    </span>
  )
}

function StorefrontSelectionsValues({ selectionType, vals }) {
  return vals.map(
    (item) =>
      item && <StorefrontSelectionsValue key={item} selectionType={selectionType} val={item} />
  )
}

export { StorefrontSelectionsValues }
