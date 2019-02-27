import React, { useEffect, useContext, useState } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';

import { hasSelections } from '../../../common/utils';

import isEmpty from 'lodash/isEmpty';

const TagsContext = React.createContext();

function FilterTags() {

   const { selections, setSelections, isLoading, data, isCleared } = useContext(FiltersContext);
   const [isInitialRender, setIsInitialRender] = useState(true);
   const [selectedTags, setSelectedTags] = useState([]);


   useEffect(() => {

      if (isInitialRender) {
         setIsInitialRender(false);
         return;
      }

      console.log('INSIDIE SELECTED TAGS', selectedTags);
      console.log('INSIDIE SELECTED TAGS isCleared', isCleared);


      setSelections({ tag: selectedTags });

   }, [selectedTags]);


   useEffect(() => {

      console.log('selectionsselectionsselections ', selections);

      if (!hasSelections(selections)) {
         setSelectedTags([]);
      }


   }, [isCleared]);


   return (
      <Filter heading="Tags">
         <div className="wps-filter-content">

            {
               isLoading
                  ? <p data-wps-is-ready="0">Loading Tags ...</p>
                  : (
                     isEmpty(data.tag)
                        ? <p>No tags found</p>
                        : <ul className="wps-tags">
                           <TagsContext.Provider value={{
                              selectedTags: selectedTags,
                              setSelectedTags: setSelectedTags
                           }}>
                              {
                                 data.tag.map(tag =>
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