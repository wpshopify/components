import React, { useContext, useState, useEffect } from 'react';
import { FiltersContext } from '../index';
import { TagsContext } from '../tags';
import union from 'lodash/union';
import without from 'lodash/without';


function FilterTag({ tag }) {

   const filtersContext = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);
   const [isSelected, setIsSelected] = useState(false);
   const [initialLoad, setInitialLoad] = useState(true);

   function getProductsFromTag(tag) {
      console.log('tag ', tag);
      console.log('selectedTags ', selectedTags);
      console.log('isSelected ', isSelected);

      if (!isSelected) {
         var newSelection = without(selectedTags, tag);

      } else {
         var newSelection = union([tag], selectedTags);
      }

      console.log('newSelection ', newSelection);

      setSelectedTags(newSelection);

   }


   useEffect(() => {

      if (initialLoad) {
         setInitialLoad(false);
         return;
      }

      console.log('FilterTag before ', selectedTags);
      getProductsFromTag(tag);
      console.log('FilterTag after ', selectedTags);

   }, [isSelected]);

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