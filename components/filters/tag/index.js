import React, { useEffect, useContext, useState } from 'react';
// import Filter from '../filter';
import { FiltersContext } from '../index';
// import isEmpty from 'lodash/isEmpty';


function FilterTag({ tag }) {

   const context = useContext(FiltersContext);

   const [isSelected, setIsSelected] = useState(false);

   useEffect(() => {

      // console.log('tagscontext.data.tags', context.data.tags);
      console.log('tags context.query', context.query);

   }, [context.query]);


   function getProductsFromTag(tag) {

      console.log('tag ', tag);
      setIsSelected(!isSelected);
      // context.setQuery(tag);

   }

   return (
      <li
         data-wps-is-selected={isSelected}
         className="wps-tag"
         onClick={e => getProductsFromTag(tag)}>

         {tag}

      </li>
   )

}

export default FilterTag;