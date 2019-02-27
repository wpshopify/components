import React, { useContext, useState, useEffect } from 'react';
import { TagsContext } from '../tags';
import union from 'lodash/union';
import without from 'lodash/without';
import isEmpty from 'lodash/isEmpty';


function FilterTag({ tag }) {

   // const { isCleared } = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);
   const [isSelected, setIsSelected] = useState(false);
   const [initialLoad, setInitialLoad] = useState(true);


   function modifySelectionList(tag) {

      if (!isSelected) {
         var newSelection = without(selectedTags, tag);

      } else {
         var newSelection = union([tag], selectedTags);
      }

      setSelectedTags(newSelection);

   }


   useEffect(() => {

      if (initialLoad) {
         setInitialLoad(false);
         return;
      }

      modifySelectionList(tag);

   }, [isSelected]);


   useEffect(() => {

      if (isEmpty(selectedTags)) {
         setIsSelected(false);
      }

   }, [selectedTags]);




   return (
      <li
         data-wps-is-selected={isSelected}
         className="wps-tag"
         onClick={e => setIsSelected(!isSelected)}>

         {tag}

      </li>
   )

}

export default FilterTag;