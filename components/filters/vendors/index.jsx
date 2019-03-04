import React, { useState, useContext, useEffect } from 'react';
import Filter from '../filter';
import isEmpty from 'lodash/isEmpty';
import { FiltersContext } from '../index';
import { FilterVendor } from '../vendor';

function FilterVendors() {

   const { selections, filterData, isLoading } = useContext(FiltersContext);
   const [selectedVendors, setSelectedVendors] = useState([]);


   useEffect(() => {

      console.log('useEffect selections from <FilterVendors />', selections.vendor);
      setSelectedVendors(selections.vendor);

   }, [selections]);


   return (
      <Filter heading="Vendors">
         <div className="wps-filter-content">
            {
               isLoading
                  ? <p data-wps-is-ready="0">Loading Vendors ...</p>
                  : (
                     isEmpty(filterData)
                        ? <p>No vendors found</p>
                        : <ul className="wps-vendors">
                           {
                              filterData.vendors.map(vendor =>
                                 <FilterVendor selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} vendor={vendor} key={vendor} />
                              )
                           }
                        </ul>
                  )
            }
         </div>
      </Filter>
   )

}

export default FilterVendors;