import React, { useContext } from 'react'
import { IconRemove } from '../../../common/icons/icon-remove.jsx'
import { StorefrontContext } from '../_state/context'
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

function StorefrontSelectionsValue({ selectionType, val }) {
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   function buildNewSelection() {
      return updateSelectionList({
         isSelected: false,
         currentList: storefrontState.selections[selectionType],
         selectedValue: val
      })
   }

   function onClick(val) {
      const newList = buildNewSelection()

      storefrontDispatch({
         type: 'SET_SELECTIONS',
         payload: typeSelectionsList(selectionType, newList)
      })

      storefrontDispatch({
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

function StorefrontSelectionsValues({ selectionType, vals }) {
   const transitions = useTransition(vals, item => item, {
      from: { transform: 'translateX(40px)' },
      enter: { transform: 'translateX(0)' },
      leave: { opacity: '0' }
   })

   return transitions.map(({ item, props, key }) => (
      <animated.div key={item} style={props}>
         <StorefrontSelectionsValue key={item} selectionType={selectionType} val={item} />
      </animated.div>
   ))

   // return vals.map(val => <StorefrontSelectionsValue key={val} selectionType={selectionType} val={val} />)
}

export { StorefrontSelectionsValues }
