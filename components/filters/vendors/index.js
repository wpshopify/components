import React, { useEffect, useContext } from 'react';
import Filter from '../filter';
import isEmpty from 'lodash/isEmpty';
import { FiltersContext } from '../index';


function FilterVendors({ data }) {

   const context = useContext(FiltersContext);

   useEffect(() => {

      console.log('vendors context.data.vendors', context.data.vendors);
      console.log('vendors context.isLoading', context.isLoading);

   }, [context.data]);

   return (
      <Filter heading="Vendors">
         <div className="wps-filter-content">
            {
               context.isLoading
                  ? <p data-wps-is-ready="0">Loading Vendors ...</p>
                  : (
                     isEmpty(context.data)
                        ? <p>No vendors found</p>
                        : <ul className="wps-vendors">
                           {
                              context.data.vendors.map(vendor =>
                                 <li key={vendor} className="wps-vendor">{vendor}</li>
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