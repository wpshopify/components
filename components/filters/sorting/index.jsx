import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'
import { usePortal } from '../../../common/hooks'

function getSelectedOption(select) {
   return select.options[select.selectedIndex]
}

function hasReverse(select) {
   var selectedOption = getSelectedOption(select)

   return selectedOption.hasAttribute('data-wps-reverse')
}

function FilterSorting() {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)

   function onChange(event) {
      if (hasReverse(event.target)) {
         filtersDispatch({ type: 'SET_REVERSE', payload: { reverse: true } })
         // setReverse(true)
      } else {
         filtersDispatch({ type: 'SET_REVERSE', payload: { reverse: false } })
         // setReverse(false)
      }

      filtersDispatch({ type: 'SET_SORT_KEY', payload: { sortKey: event.target.value } })
      // setOptionState(event.target.value)
   }

   return usePortal(
      <div className='wps-component wps-component-sorting'>
         <label className='wps-sorting-heading' htmlFor='wps-sorting'>
            Sort by:
         </label>

         <select value={filtersState.filterParams.sortKey} id='wps-sorting' onChange={e => onChange(e)}>
            <option value='default' disabled='disabled'>
               Choose an option
            </option>
            <option value='PRICE'>Price (Low to high)</option>
            <option value='PRICE' data-wps-reverse>
               Price (High to low)
            </option>
            <option value='CREATED_AT' data-wps-reverse>
               New Arrival
            </option>
            <option value='BEST_SELLING'>Best Selling</option>
            <option value='TITLE'>Title (A-Z)</option>
            <option value='TITLE' data-wps-reverse>
               Title (Z-A)
            </option>
         </select>
      </div>,
      document.querySelector(filtersState.componentOptions.dropzoneSorting)
   )
}

export { FilterSorting }
