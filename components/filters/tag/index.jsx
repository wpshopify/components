import React, { useContext, useRef, useState, useEffect } from 'react';
import { TagsContext } from '../tags';
import { FiltersContext } from '../index';
import {
   updateSelectionList,
   isSelectionsOfTypeEmpty,
   findModifiedSelection,
   changedSelectionMatch
} from '../../../common/selections';








function useSelectionsChange(type, localValue, localSetter) {

   console.log('FilterTag isSelectionsModified');

}






function FilterTag({ tag }) {

   const { selections, setSelections, isCleared, isSelectionsModified } = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);
   const [isSelected, setIsSelected] = useState(false);

   const isFirstRender = useRef(true);




   /*
   
   When selections are changed ...
   
   */
   useEffect(() => {

      // console.log('FilterTag isSelectionsModified');

      // if (isFirstRender.current) {
      //    isFirstRender.current = false;
      //    return;
      // }

      // // If selections of [type] are empty, zero everything out
      // if (isSelectionsOfTypeEmpty()) {

      //    setIsSelected(false);
      //    setSelectedTags([]);
      //    return;

      // }

      // var changedValues = findModifiedSelection(selectedTags, selections.tag);

      // if (changedSelectionMatch(changedValues, tag)) {
      //    setIsSelected(false);
      //    setSelectedTags(selections.tag);

      // }

   }, [isSelectionsModified]);




   const onTagClick = () => {

      setIsSelected(!isSelected);

      var newTagsList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.tag,
         selectedValue: tag
      });

      setSelectedTags(newTagsList);
      setSelections({ tag: newTagsList });

   }


   return (
      <li
         data-wps-is-selected={isSelected}
         data-wps-tag={tag}
         className="wps-tag"
         onClick={onTagClick}>

         {tag}

      </li>
   )

}

export default FilterTag;