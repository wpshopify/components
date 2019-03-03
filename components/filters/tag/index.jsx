import React, { useContext, useRef, useState, useEffect } from 'react';
import { FiltersContext } from '../index';
import { updateSelectionList, isCurrentlySelected } from '../../../common/selections';
import update from 'immutability-helper';


function FilterTag({ tag, selectedTags, setSelectedTags }) {

   const { selections, setSelections } = useContext(FiltersContext);
   const [isSelected, setIsSelected] = useState(false);
   const isFirstRender = useRef(true);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      setIsSelected(isCurrentlySelected(selections, tag, 'tag'));

   }, [selectedTags]);



   const onTagClick = () => {

      setIsSelected(!isSelected);

      var newTagsList = updateSelectionList({
         isSelected: !isSelected,
         currentList: selections.tag,
         selectedValue: tag
      });

      const updatedSelections = update(selections, { $merge: { tag: newTagsList } });

      setSelections(updatedSelections);
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