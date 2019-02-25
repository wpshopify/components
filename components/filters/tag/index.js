import React, { useEffect, useContext, useState } from 'react';
// import Filter from '../filter';
import { FiltersContext } from '../index';
import { TagsContext } from '../tags';
import compact from 'lodash/compact';
import union from 'lodash/union';
import without from 'lodash/without';


function FilterTag({ tag }) {

   const filtersContext = useContext(FiltersContext);
   const { selectedTags, setSelectedTags } = useContext(TagsContext);

   const [isSelected, setIsSelected] = useState(false);


   // useEffect(() => {

   //    // console.log('Tag selection changed');
   //    // console.log('Selected Tags: ', selectedTags);

   //    if (filtersContext.query === false) {
   //       console.log('Intial Render FilterTag, skipping ...');
   //       return;
   //    }


   //    // console.log('Not on load', context);

   //    // if (isSelected) {
   //    //    console.log('Updating query with this tag: ', tag);
   //    //    filtersContext.setQuery('tag:' + tag);
   //    // }

   //    // console.log('New query: ', filtersContext.query);

   //    // console.log('isSelected ', isSelected);


   // }, [isSelected]);


   function buildQueryFromTag(tag, currentQuery) {
      console.log('currentQuery', currentQuery);

      // If current query is false
      if (!currentQuery) {
         return 'tag:' + tag;
      }

      var parts = compact(currentQuery.split('tag:'));
      console.log('parts ', parts);

      var newstuff = parts.reduce(function (accumulator, currentValue) {

         console.log('accumulator ', accumulator);
         console.log('currentValue ', currentValue);

         return accumulator + ' tag:' + currentValue;
      });

      console.log('newstuff ', newstuff);

      return newstuff;

   }




   function getProductsFromTag(tag) {

      if (isSelected) {
         var removedList = without(selectedTags, tag);
         console.log('removedList ', removedList);
         setSelectedTags(removedList);

      } else {
         setSelectedTags(union([tag], selectedTags));
      }



      console.log('selected tag ', tag);


      // console.log('Selected tag ', tag);
      // console.log('Current query: ', filtersContext.query);

      // var result = buildQueryFromTag(tag, filtersContext.query);


      // console.log('result ', result);


      // filtersContext.setQuery('tag:' + tag);
      setIsSelected(!isSelected);
      // filtersContext.setQuery(tag);

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