import React, { useContext, useRef, useState, useEffect } from 'react'
import { FiltersContext } from '../_state/context'
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections'

function FilterTag({ tag }) {
   const { filtersState, filtersDispatch } = useContext(FiltersContext)
   const [isSelected, setIsSelected] = useState(false)
   const isFirstRender = useRef(true)

   function buildNewSelection() {
      return updateSelectionList({
         isSelected: !isSelected,
         currentList: filtersState.selections.tag,
         selectedValue: tag
      })
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      setIsSelected(isCurrentlySelected(filtersState.selections, tag, 'tag'))
   }, [filtersState.selectedTags])

   const onTagClick = () => {
      setIsSelected(!isSelected)

      const newList = buildNewSelection()

      console.log('Setting selections from <FilterTag>')

      filtersDispatch({
         type: 'SET_SELECTIONS',
         payload: {
            tag: newList
         }
      })
      console.log('newList', newList)

      filtersDispatch({ type: 'SET_SELECTED_TAGS', payload: newList })
   }

   return (
      <li data-wps-is-current={isSelected} data-wps-is-selected={isSelected} data-wps-tag={tag} className='wps-tag' onClick={onTagClick}>
         {tag}
      </li>
   )
}

export { FilterTag }
