import React, { useContext, useRef, useState, useEffect } from 'react';
import { FiltersContext } from '../index';
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections';



function FilterTag({ tag, selectedTags, setSelectedTags }) {

   const { selections, setSelections } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);


   const isFirstRender = useRef(true);


   useEffect(() => {
      console.log('useEffect selections from <FilterTag />');

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      console.log('22222');

      setIsSelected(isCurrentlySelected(selections, tag, 'tag'));

   }, [selectedTags]);


   const onTagClick = () => {

      setIsSelected(!isSelected);

      var newTagsList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.tag,
         selectedValue: tag
      });

      setSelections({ tag: newTagsList });
      setSelectedTags(newTagsList);

   }


   return (
      <li
         data-wps-is-current={isSelected}
         data-wps-is-selected={isSelected}
         data-wps-tag={tag}
         className="wps-tag"
         onClick={onTagClick}>

         {tag}

      </li>
   )

}

export default FilterTag;