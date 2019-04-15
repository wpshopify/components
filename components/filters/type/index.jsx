import React, { useEffect, useState, useContext, useRef } from 'react'
import { FiltersContext } from '../_state/context'
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections'

function FilterType({ type }) {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)
   const [isSelected, setIsSelected] = useState(false)
   const isFirstRender = useRef(true)

   function buildNewSelection() {
      return updateSelectionList({
         isSelected: !isSelected,
         currentList: filtersState.selections.product_type,
         selectedValue: type
      })
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      setIsSelected(isCurrentlySelected(filtersState.selections, type, 'product_type'))
   }, [filtersState.selectedTypes])

   const onClick = () => {
      setIsSelected(!isSelected)

      const newList = buildNewSelection()

      console.log('Setting selections from <FilterType>')

      filtersDispatch({ type: 'SET_SELECTIONS', payload: { product_type: newList } })
      filtersDispatch({ type: 'SET_SELECTED_TYPES', payload: newList })
   }

   return (
      <div className='wps-input-wrapper' data-wps-is-selected={isSelected}>
         <input id={'input-' + type} type='checkbox' checked={isSelected ? 'checked' : ''} className='wps-input-value' onChange={onClick} />

         <label htmlFor={'input-' + type} className='wps-input-label'>
            {type}
         </label>
      </div>
   )
}

export { FilterType }
