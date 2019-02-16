import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { queryProducts } from '@wpshopify/api';
import debounce from 'lodash/debounce';

import { Product } from '../products';
import { DropZone } from './dropzone';


/*

Component: Search

*/
function Search(props) {

  const [searchTerm, setSearchTerm]   = useState('');
  const [isLoading, setisLoading]     = useState(false);
  const [searchData, setSearchData]   = useState([]);

  const debouncedGetResults           = debounce( () => getResults(), 200 );

  console.log('dropZone ', props.dropZone);

  /*

  Search Value

  */
  function searchValue(value) {
    return "title:" + value + "*";
  }


  /*

  Render Product

  */
  function renderProduct(product) {
    console.log('product ID', product.id);
  }


  /*

  Render Products

  */
  function renderProducts(products) {
    return products.map(renderProduct);
  }


  /*

  Use Effect

  */
  useEffect( () => {

    debouncedGetResults();

  }, [searchTerm] );



  /*

  Get products on search change

  */
  const getResults = async () => {

    setisLoading(true);

    const results = await queryProducts({
      first: 20,
      sortKey: 'PRICE',
      query: searchValue(searchTerm),
      reverse: false
    });

    setSearchData(results);
    setisLoading(false);

  }


  /*

  Return

  */
  return (
    <>
      <form role="search" className="wps-search-form">

        <div className="is-loading">{ isLoading ? 'Loading ...' : '' }</div>

        <div className="wps-search-wrapper">

          <input
            type="search"
            id="wps-search-input"
            name="search"
            val={ searchTerm }
            placeholder="Search the store"
            aria-label="Search store"
            onChange={ (e) => {

              setSearchTerm(e.target.value);

            }}
          />

          <button className="wps-search-submit">Search</button>

        </div>

      </form>

      <DropZone dropZone={ props.dropZone } items={ searchData }></DropZone>

    </>

  )

}


function defaultProps() {

  return {
    dropZone: false
  }

}

Search.defaultProps = defaultProps();

export default Search;
