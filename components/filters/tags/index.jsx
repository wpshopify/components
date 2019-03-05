import React, { useContext, useState, useEffect } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';
import isEmpty from 'lodash/isEmpty';


function FilterTags() {

   const { isBootstrapping, filterData, selections } = useContext(FiltersContext);
   const [selectedTags, setSelectedTags] = useState([]);


   useEffect(() => {

      console.log('useEffect selections from <FilterTags />', selections.tag);
      setSelectedTags(selections.tag);

   }, [selections]);

   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">

            {
               isBootstrapping
                  ? <p data-wps-is-ready="0">Loading Tags ...</p>
                  : (
                     isEmpty(filterData.tag)
                        ? <p>No tags found</p>
                        : <ul className="wps-tags">

                           {
                              filterData.tag.map(tag =>
                                 <FilterTag selectedTags={selectedTags} setSelectedTags={setSelectedTags} key={tag} tag={tag} />
                              )
                           }

                        </ul>
                  )
            }
         </div>
      </Filter >
   )

}

export {
   FilterTags
}