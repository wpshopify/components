import React, { useContext, useState, useEffect } from 'react';
import { TagsContext } from '../tags';
import { FiltersContext } from '../index';

import union from 'lodash/union';
import without from 'lodash/without';
import difference from 'lodash/difference';


function FilterTag({ tag }) {

   const { selections, setSelections, isCleared, isModified } = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);
   const [isSelected, setIsSelected] = useState(false);
   const [initialLoad, setInitialLoad] = useState(true);


   function modifySelectionList(tag) {

      if (!isSelected) {
         var newSelection = without(selections.tag, tag);

      } else {
         var newSelection = union([tag], selections.tag);
      }

      return newSelection;

   }


   useEffect(() => {

      if (initialLoad) {
         setInitialLoad(false);
         return;
      }

      if (!selections.tag) {
         setIsSelected(false);
         setSelectedTags([]);
         return;
      }


      var foundModifiedTag = difference(selectedTags, selections.tag);


      if (foundModifiedTag[0] === tag) {

         setIsSelected(false);
         setSelectedTags(selections.tag);

      }

   }, [isModified]);


   useEffect(() => {

      if (initialLoad) {
         setInitialLoad(false);
         return;
      }

      var newTagsList = modifySelectionList(tag);

      setSelectedTags(newTagsList);
      setSelections({ tag: newTagsList });

   }, [isSelected]);


   return (
      <li
         data-wps-is-selected={isSelected}
         data-wps-tag={tag}
         className="wps-tag"
         onClick={e => setIsSelected(!isSelected)}>

         {tag}

      </li>
   )

}

export default FilterTag;