import React, { useContext, useRef, useState, useEffect } from 'react';
import { TagsContext } from '../tags';
import { FiltersContext } from '../index';
import {
   updateSelectionList,
   isSelectionsOfTypeEmpty,
   findModifiedSelection,
   changedSelectionMatch,
   useSelectionsRemoved
} from '../../../common/selections';















function FilterTag({ tag, isTagSelected }) {

   const { selections, setSelections, isCleared, isSelectionsRemoved } = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);
   const [isSelected, setIsSelected] = useState(false);

   const isFirstRender = useRef(true);
   // const { isDeselected, updatedSelections } = useSelectionsRemoved(selections, 'tag', tag, selectedTags);



   const onTagClick = () => {

      setIsSelected(!isSelected);

      var newTagsList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.tag,
         selectedValue: tag
      });

      // checkSelectedValue(tag);
      setSelectedTags(newTagsList);
      setSelections({ tag: newTagsList });

   }


   return (
      <li
         data-wps-is-selected={isTagSelected()}
         data-wps-tag={tag}
         className="wps-tag"
         onClick={onTagClick}>

         {tag}

      </li>
   )

}

export default FilterTag;