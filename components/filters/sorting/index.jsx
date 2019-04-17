import React, { useContext, useState } from 'react'
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
   const [sortValue, setSortValue] = useState('TITLE')

   function updateFetchParams(event) {
      let reverse = false

      if (hasReverse(event.target)) {
         reverse = true
      }
      console.log('reverse ....................................', reverse)

      let sortKey = event.target.value
      console.log('sortKey b', sortKey)
      if (sortKey.includes('-REVERSE')) {
         sortKey = sortKey.replace('-REVERSE', '')
      }

      console.log('sortKey a', sortKey)

      return {
         reverse: reverse,
         sortKey: sortKey
      }
   }

   function onChange(event) {
      setSortValue(event.target.value)

      filtersDispatch({ type: 'SET_FILTER_PARAMS', payload: updateFetchParams(event) })
   }

   return usePortal(
      <div className='wps-component wps-component-sorting'>
         <label className='wps-sorting-heading' htmlFor='wps-sorting'>
            Sort by:
         </label>

         <select value={sortValue} id='wps-sorting' onChange={e => onChange(e)}>
            <option value='DEFAULT' disabled='disabled'>
               Choose an option
            </option>
            <option value='PRICE'>Price (Low to high)</option>
            <option value='PRICE-REVERSE' data-wps-reverse>
               Price (High to low)
            </option>
            <option value='CREATED_AT' data-wps-reverse>
               New Arrival
            </option>
            <option value='BEST_SELLING'>Best Selling</option>
            <option value='TITLE'>Title (A-Z)</option>
            <option value='TITLE-REVERSE' data-wps-reverse>
               Title (Z-A)
            </option>
         </select>
      </div>,
      document.querySelector(filtersState.componentOptions.dropzoneSorting)
   )
}

export { FilterSorting }
