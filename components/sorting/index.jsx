import React, { useState, useEffect } from 'react';

function Sorting({ dropZone }) {

   return (

      <div className="wps-component wps-comonent-sorting">

         <label htmlFor="wps-sorting">Sort by:</label>

         <select id="wps-sorting">
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

export default Sorting;