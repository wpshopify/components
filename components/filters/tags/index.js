import React, { useEffect, useContext, useState } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';
import isEmpty from 'lodash/isEmpty';

const TagsContext = React.createContext();

function FilterTags() {

   const filtersContext = useContext(FiltersContext);
   const [selectedTags, setSelectedTags] = useState([]);

   useEffect(() => {

      console.log('tags filtersContext.data.tags', filtersContext.data.tags);
      console.log('tags filtersContext.isLoading', filtersContext.isLoading);

   }, [filtersContext.data]);


   useEffect(() => {

      filtersContext.setSelections({ tags: selectedTags });

   }, [selectedTags]);


   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">

            {
               filtersContext.isLoading
                  ? <p data-wps-is-ready="0">Loading Tags ...</p>
                  : (
                     isEmpty(filtersContext.data.tags)
                        ? <p>No tags found</p>
                        : <ul className="wps-tags">
                           <TagsContext.Provider value={{
                              selectedTags: selectedTags,
                              setSelectedTags: setSelectedTags
                           }}>
                              {
                                 filtersContext.data.tags.map(tag =>
                                    <FilterTag key={tag} tag={tag} />
                                 )
                              }
                           </TagsContext.Provider>
                        </ul>
                  )
            }
         </div>
      </Filter >
   )

}

export {
   FilterTags,
   TagsContext
}