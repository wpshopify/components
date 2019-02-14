import 'babel-polyfill';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { queryProducts } from '@wpshopify/api';


function Search() {

  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setisLoading] = useState(false);



  const onChangeEvent = async event => {

    // setisLoading(true);
    console.log('searchTerm ', searchTerm);

    var result = await queryProducts({
      first: 20,
      sortKey: 'PRICE',
      query: "title:Sm*",
      reverse: false
    });

    console.log('result ', result);

    // setisLoading(false);
    setSearchTerm(event.target.value);



  }


  return (
    <form role="search" className="wps-search-form">
      <div className="wps-search-wrapper">
        <input
          type="search"
          id="wps-search-input"
          name="search"
          val={ searchTerm }
          placeholder="Search the store"
          aria-label="Search store"
          onChange={ onChangeEvent } />

        <button className="wps-search-submit">Search</button>

        { isLoading ? 'Loading ...' : '' }

      </div>
    </form>
  )

}

export default Search;
