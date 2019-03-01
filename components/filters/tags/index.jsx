import React, { useContext, useState } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';
import isEmpty from 'lodash/isEmpty';

const TagsContext = React.createContext();

function FilterTags() {

   const { isLoading, filterData } = useContext(FiltersContext);
   const [selectedTags, setSelectedTags] = useState([]);

   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">

            {
               isLoading
                  ? <p data-wps-is-ready="0">Loading Tags ...</p>
                  : (
                     isEmpty(filterData.tag)
                        ? <p>No tags found</p>
                        : <ul className="wps-tags">

                           <TagsContext.Provider value={{
                              selectedTags: selectedTags,
                              setSelectedTags: setSelectedTags
                           }}>

                              {
                                 filterData.tag.map(tag =>
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