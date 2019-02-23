import React, { useEffect, useContext } from 'react';
import Filter from '../filter';
import isEmpty from 'lodash/isEmpty';
import { FiltersContext } from '../index';


function FilterVendors({ data }) {

   const filterData = useContext(FiltersContext);

   useEffect(() => {

      console.log('filterData.vendors', filterData.vendors);

   }, [filterData]);

   return (
      <Filter heading="Vendors">
         <div className="wps-filter-content">
            {
               isEmpty(filterData)
                  ? <p>No vendors found</p>
                  : <ul className="wps-vendors">
                     {
                        filterData.vendors.map(vendor =>
                           <li key={vendor} className="wps-vendor">{vendor}</li>
                        )
                     }
                  </ul>
            }
         </div>
      </Filter>
   )

}

export default FilterVendors;