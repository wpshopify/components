import React, { useContext, useRef, useState, useEffect } from 'react'
import { FiltersContext } from '../../_state/context'
import { updateSelectionList, isCurrentlySelected } from '../../../../common/selections'

function capitalizeFirstLetter(string) {
   return string.toLowerCase().replace(/^\w/, c => c.toUpperCase())
}

function typeSelectionsList(itemType, typeSelections) {
   const temp = {}

   temp[itemType] = typeSelections

   return temp
}

function FilterOptionsGroupItem({ itemValue, itemType, displayStyle }) {
   const [filtersState, filtersDispatch] = useContext(FiltersContext)

   const [isSelected, setIsSelected] = useState(false)
   const isFirstRender = useRef(true)

   function buildNewSelection() {
      return updateSelectionList({
         isSelected: !isSelected,
         currentList: filtersState.selections[itemType],
         selectedValue: itemValue
      })
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      setIsSelected(isCurrentlySelected(filtersState.selections, itemValue, itemType))
   }, [filtersState['selected' + capitalizeFirstLetter(itemType)]])

   function onClick() {
      setIsSelected(!isSelected)

      const newList = buildNewSelection()

      filtersDispatch({
         type: 'SET_SELECTIONS',
         payload: typeSelectionsList(itemType, newList)
      })

      filtersDispatch({
         type: 'SET_SELECTED_' + itemType.toUpperCase(),
         payload: newList
      })
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

export { FilterOptionsGroupItem }
