import React, { useContext } from 'react';
import { FiltersContext } from '../filters';

function PaginationPageSize() {

   const { pageSize, setPageSize } = useContext(FiltersContext);

   function onChange(event) {

      setPageSize(parseInt(event.target.value));

   }

   return (
      <div className="wps-component wps-comonent-sorting">

         <label className="wps-sorting-heading" htmlFor="wps-sorting">Page size:</label>

         <select value={pageSize} id="wps-sorting" onChange={e => onChange(e)}>
            <option value="25">25</option>
            <option value="50" data-wps-reverse>50</option>
            <option value="100">100</option>
            <option value="250" data-wps-reverse>250</option>
         </select>

      </div>
   )

}

export {
   PaginationPageSize
}
