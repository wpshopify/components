import 'babel-polyfill'
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { queryProducts, fetchByTitleParams } from '@wpshopify/api'
import { useDebounce } from 'use-debounce'
import { DropZone } from '../dropzone'
import { LoadingContext } from '../../common/state/context'

function searchDefaultProps() {
   return {
      dropZone: false
   }
}

/*

Component: Search

*/
function Search(props) {
   const [searchTerm, setSearchTerm] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [searchData, setSearchData] = useState([])
   const isFirstRender = useRef(true)

   const debouncedSearchTerm = useDebounce(searchTerm, 300)

   /*
 
   Use Effect
 
   */

   useEffect(() => {
      if (!isFirstRender.current) {
         getResults()
         return
      }

      isFirstRender.current = false
   }, [debouncedSearchTerm])

   function fetchProducts() {
      return queryProducts(fetchByTitleParams(debouncedSearchTerm))
   }

   /*
 
   Get products on search change
 
   */
   const getResults = async () => {
      setIsLoading(true)

      const results = await fetchProducts()

      setSearchData(results)
      setIsLoading(false)
   }

   /*
 
   Return
 
   */
   return (
      <>
         {ReactDOM.createPortal(
            <>
               <form role='search' className='wps-search-form'>
                  <div className='is-loading'>{isLoading ? 'Loading ...' : ''}</div>

                  <div className='wps-search-wrapper'>
                     <input
                        type='search'
                        id='wps-search-input'
                        name='search'
                        val={debouncedSearchTerm}
                        placeholder='Search the store'
                        aria-label='Search store'
                        onChange={e => setSearchTerm(e.target.value)}
                     />

                     <button className='wps-search-submit'>Search</button>
                  </div>
               </form>
               <LoadingContext.Provider value={{ isLoading: isLoading, from: 'search' }}>
                  <DropZone dropZone={props.dropZone} items={searchData} />
               </LoadingContext.Provider>
            </>,
            document.querySelector(props.componentDropZone)
         )}
      </>
   )
}

Search.defaultProps = searchDefaultProps()

export { Search }
