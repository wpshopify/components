import React, { useContext, useRef, useState, useEffect } from 'react'
import { StorefrontContext } from '../../_state/context'
import { updateSelectionList, isCurrentlySelected, createSelectionsOfType, buildNewSelection } from '../../../../common/selections'
import { capitalizeFirstLetter } from '../../../../common/utils'

function StorefrontFilterOptionsGroupItem({ itemValue, itemType, displayStyle }) {
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   const [isSelected, setIsSelected] = useState(false)
   const isFirstRender = useRef(true)

   useEffect(() => {
      setIsSelected(isCurrentlySelected(storefrontState.selections, itemValue, itemType))
   }, [storefrontState['selected' + capitalizeFirstLetter(itemType)]])

   function onClick() {
      setIsSelected(!isSelected)

      const newList = buildNewSelection(itemValue, itemType, isSelected, storefrontState.selections)

      if (newList) {
         storefrontDispatch({
            type: 'SET_SELECTIONS',
            payload: createSelectionsOfType(itemType, newList)
         })

         storefrontDispatch({
            type: 'SET_SELECTED_' + itemType.toUpperCase(),
            payload: newList
         })
      }
   }

   return displayStyle === 'checkbox' ? (
      <li
         data-wps-is-current={isSelected}
         data-wps-is-selected={isSelected}
         data-wps-filter-value={itemValue}
         data-wps-display-style={displayStyle}
         className={'wps-' + itemType + '-single wps-filter-single'}>
         <input id={'input-' + itemValue} type='checkbox' onChange={onClick} checked={isSelected ? 'checked' : ''} className='wps-input-value' />

         <label htmlFor={'input-' + itemValue} className='wps-input-label'>
            {itemValue}
         </label>
      </li>
   ) : (
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
}

export { StorefrontFilterOptionsGroupItem }
