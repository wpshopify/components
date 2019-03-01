import React, { useContext, useRef, useState, useEffect } from 'react';
import Filter from '../filter';
import { FiltersContext } from '../index';
import FilterTag from '../tag';
import isEmpty from 'lodash/isEmpty';
import { useSelectionsRemoved } from '../../../common/selections';

const TagsContext = React.createContext();

function FilterTags() {

   const { selections, isLoading, filterData, isSelectionsRemoved } = useContext(FiltersContext);
   const [selectedTags, setSelectedTags] = useState([]);

   const isFirstRender = useRef(true);
   // const { isDeselected, updatedSelections } = useSelectionsRemoved(selections, 'tag', 'test', selectedTags);


   function checkIfIsTagSelected(tag) {
      console.log('checking if tag is selected ...', tag);
      console.log('checking if tag is selected selectedTags ...', selectedTags);

      if (selectedTags.find(selected => selected === tag)) {
         return true;
      }

      return false;

   }

   /*

   When selections are changed ...

   */
   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      console.log('FilterTag useEffect 1');

      // if (isDeselected) {
      //    console.log('FilterTag useEffect 2');
      //    setIsSelected(false);
      //    setSelectedTags(updatedSelections);
      // }

   }, [isSelectionsRemoved]);



   // useEffect(() => {

   //    if (isFirstRender.current) {
   //       isFirstRender.current = false;
   //       return;
   //    }

   //    console.log('FilterTag selectedTags ', selectedTags);

   //    // if (isDeselected) {
   //    //    console.log('FilterTag useEffect 2');
   //    //    setIsSelected(false);
   //    //    setSelectedTags(updatedSelections);
   //    // }

   // }, [selectedTags]);



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
                                    <FilterTag isTagSelected={() => checkIfIsTagSelected(tag)} key={tag} tag={tag} />
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