import React, { useContext, useRef, useEffect } from 'react'
import { IconRemove } from '../../../common/icons/icon-remove.jsx'
import { removeFrom } from '../../../common/utils'
import { FiltersContext } from '../_state/context'
import { useTransition, animated } from 'react-spring'
import update from 'immutability-helper'

function inSelection(selectionsArray, valToSearchFor) {
   return selectionsArray.find(element => element === valToSearchFor)
}

function FilterSelectionsValue({ selectionType, val }) {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)

   const isFirstRender = useRef(true)

   function maybeRemoveValueFromSelections(val) {
      var selectionsCopy = filtersState.selections

      if (inSelection(selectionsCopy[selectionType], val)) {
         return removeFrom(selectionsCopy[selectionType], val)
      }

      // If not found, just return the original list
      return selectionsCopy[selectionType]
   }

   function buildNewSelectionObject(type, newStuff) {
      var newBuild = {}

      newBuild[type] = newStuff

      return newBuild
   }

   // useEffect(() => {
   //    if (isFirstRender.current) {
   //       isFirstRender.current = false
   //       return
   //    }

   //    const updatedSelectionsObj = buildNewSelectionObject(selectionType, maybeRemoveValueFromSelections(val))
   //    const updatedSelections = update(filtersState.selections, { $merge: updatedSelectionsObj })

   //    // setSelections(updatedSelections);
   //    console.log('Setting selections from <FilterSelectionsValue>')
   //    filtersDispatch({ type: 'SET_SELECTIONS', payload: updatedSelections })
   // }, [filtersState.isCleared])

   function onClick(val) {
      console.log('Clearing from <FilterSelectionsValue>', val)

      filtersDispatch({ type: 'SET_IS_CLEARED', payload: true })
   }

   return (
      <span className='wps-filter-selection-value' onClick={e => onClick(val)}>
         {val} <IconRemove />{' '}
      </span>
   )
}

function FilterSelectionsValues({ selectionType, vals }) {
   const transitions = useTransition(vals, item => item, {
      from: { transform: 'translateX(40px)' },
      enter: { transform: 'translateX(0)' },
      leave: { display: 'none' }
   })

   return transitions.map(({ item, props, key }) => (
      <animated.div key={item} style={props}>
         <FilterSelectionsValue key={item} selectionType={selectionType} val={item} />
      </animated.div>
   ))

   // return vals.map(val => <FilterSelectionsValue key={val} selectionType={selectionType} val={val} />)
}

export { FilterSelectionsValues }
