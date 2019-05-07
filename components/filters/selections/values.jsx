import React, { useContext } from 'react'
import { IconRemove } from '../../../common/icons/icon-remove.jsx'
import { FiltersContext } from '../_state/context'
import { useTransition, animated } from 'react-spring'
import { updateSelectionList } from '../../../common/selections'

function inSelection(selectionsArray, valToSearchFor) {
   return selectionsArray.find(element => element === valToSearchFor)
}

function typeSelectionsList(itemType, typeSelections) {
   const temp = {}

   temp[itemType] = typeSelections

   return temp
}

function FilterSelectionsValue({ selectionType, val }) {
   // const { filtersState, filtersDispatch } = useContext(FiltersContext)
   const [filtersState, filtersDispatch] = useContext(FiltersContext)

   function buildNewSelection() {
      return updateSelectionList({
         isSelected: false,
         currentList: filtersState.selections[selectionType],
         selectedValue: val
      })
   }

   function onClick(val) {
      const newList = buildNewSelection()

      filtersDispatch({
         type: 'SET_SELECTIONS',
         payload: typeSelectionsList(selectionType, newList)
      })

      filtersDispatch({
         type: 'SET_SELECTED_' + selectionType.toUpperCase(),
         payload: newList
      })
   }

   return (
      <span className='wps-filter-selection-value wps-mr-2' onClick={e => onClick(val)}>
         {val} <IconRemove />{' '}
      </span>
   )
}

function FilterSelectionsValues({ selectionType, vals }) {
   const transitions = useTransition(vals, item => item, {
      from: { transform: 'translateX(40px)' },
      enter: { transform: 'translateX(0)' },
      leave: { opacity: '0' }
   })

   return transitions.map(({ item, props, key }) => (
      <animated.div key={item} style={props}>
         <FilterSelectionsValue key={item} selectionType={selectionType} val={item} />
      </animated.div>
   ))

   // return vals.map(val => <FilterSelectionsValue key={val} selectionType={selectionType} val={val} />)
}

export { FilterSelectionsValues }
