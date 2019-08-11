import React, { useContext } from 'react'
import { IconRemove } from '../../../common/icons/icon-remove.jsx'
import { StorefrontContext } from '../_state/context'
import { useTransition, animated } from 'react-spring'
import { createSelectionsOfType, buildNewSelection } from '../../../common/selections'

function inSelection(selectionsArray, valToSearchFor) {
   return selectionsArray.find(element => element === valToSearchFor)
}

function StorefrontSelectionsValue({ selectionType, val }) {
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   function onClick(val) {
      const newList = buildNewSelection(val, selectionType, true, storefrontState.selections)

      storefrontDispatch({
         type: 'SET_SELECTIONS',
         payload: createSelectionsOfType(selectionType, newList)
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
