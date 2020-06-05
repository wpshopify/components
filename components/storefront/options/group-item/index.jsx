import { StorefrontContext } from '../../_state/context'
import {
  isCurrentlySelected,
  createSelectionsOfType,
  buildNewSelection,
} from '../../../../common/selections'
import { capitalizeFirstLetter } from '../../../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import StorefrontFilterOptionsGroupItemValue from '../group-item-value'

const { useEffect, useContext, useState } = wp.element

function StorefrontFilterOptionsGroupItem({ itemValue, itemType, displayStyle }) {
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)
  const [isSelected, setIsSelected] = useState(() => false)

  useEffect(() => {
    setIsSelected(isCurrentlySelected(storefrontState.selections, itemValue, itemType))
  }, [storefrontState['selected' + capitalizeFirstLetter(itemType)]])

  function onClick() {
    setIsSelected(!isSelected)

    const newList = buildNewSelection(itemValue, itemType, isSelected, storefrontState.selections)

    if (newList) {
      storefrontDispatch({
        type: 'SET_SELECTIONS',
        payload: createSelectionsOfType(itemType, newList),
      })

      storefrontDispatch({
        type: 'SET_SELECTED_' + itemType.toUpperCase(),
        payload: newList,
      })
    }
  }

  return (
    <StorefrontFilterOptionsGroupItemValue
      displayStyle={displayStyle}
      isSelected={isSelected}
      itemType={itemType}
      itemValue={itemValue}
      onClick={onClick}
    />
  )
}

export { StorefrontFilterOptionsGroupItem }
