import React, { useEffect, useContext } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import isEmpty from 'lodash/isEmpty';


function FilterTags() {

   const filterData = useContext(FiltersContext);

   useEffect(() => {

      console.log('filterData.tags', filterData.tags);

   }, [filterData]);


   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">
            {
               isEmpty(filterData)
                  ? <p>No tags found</p>
                  : <ul className="wps-tags">
                     {
                        filterData.tags.map(tag =>
                           <li key={tag} className="wps-tag">{tag}</li>
                        )
                     }
                  </ul>
            }
         </div>
      </Filter>
   )

}

export default FilterTags;