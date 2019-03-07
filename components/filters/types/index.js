import React, { useState, useContext, useEffect } from 'react';
import Filter from '../filter';
import isEmpty from 'lodash/isEmpty';
import { FiltersContext } from '../index';
import { FilterType } from '../type';

function FilterTypes() {

   const { selections, filterData, isBootstrapping } = useContext(FiltersContext);
   const [selectedTypes, setSelectedTypes] = useState([]);


   useEffect(() => {

      setSelectedTypes(selections.product_type);

   }, [selections]);


   return (
      <Filter heading="Types">
         <div className="wps-filter-content">
            {
               isBootstrapping
                  ? <p data-wps-is-ready="0">Loading product types ...</p>
                  : (
                     isEmpty(filterData)
                        ? <p>No types found</p>
                        : <ul className="wps-filters-list wps-types">
                           {
                              filterData.types.map(type =>
                                 <FilterType selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} type={type} key={type} />
                              )
                           }
                        </ul>
                  )
            }
         </div>
      </Filter>
   )

}

export {
   FilterTypes
}