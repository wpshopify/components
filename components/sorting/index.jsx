import React, { useState, useEffect } from 'react';

function Sorting() {

   function onChange(event) {
      console.log('Changed val ', event.target.value);
   }

   return (

      <div className="wps-component wps-comonent-sorting">

         <label className="wps-sorting-heading" htmlFor="wps-sorting">Sort by:</label>

         <select id="wps-sorting" onChange={e => onChange(e)}>
            <option value="">Choose an option</option>
            <option value="bestSelling ">Best Selling</option>
            <option value="price">Price</option>
            <option value="newArrival">New Arrival</option>
            <option value="title">Title</option>
            <option value="type">Type</option>
            <option value="vendor">Vendor</option>
         </select>

      </div>

   )

}

export {
   Sorting
}