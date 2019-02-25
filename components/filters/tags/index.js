import React, { useEffect, useContext, useState } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';
import isEmpty from 'lodash/isEmpty';


function FilterTags() {

   const context = useContext(FiltersContext);


   useEffect(() => {

      console.log('tagscontext.data.tags', context.data.tags);
      console.log('tags context.isLoading', context.isLoading);

   }, [context.data]);


   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">
            {
               context.isLoading
                  ? <p data-wps-is-ready="0">Loading Tags ...</p>
                  : (
                     isEmpty(context.data.tags)
                        ? <p>No tags found</p>
                        : <ul className="wps-tags">
                           {
                              context.data.tags.map(tag =>
                                 <FilterTag key={tag} tag={tag} />
                              )
                           }
                        </ul>
                  )
            }
         </div>
      </Filter>
   )

}

export default FilterTags;