import React from 'react'
import { ProductGalleryReducer } from './reducer'
import { ProductGalleryInitialState } from './initial-state'
import { ProductGalleryContext } from './context'

function ProductGalleryProvider(props) {
   const [state, dispatch] = React.useReducer(ProductGalleryReducer, ProductGalleryInitialState(props.productState))

   const value = React.useMemo(() => [state, dispatch], [state])

   return <ProductGalleryContext.Provider value={value} {...props} />
}

export { ProductGalleryProvider }
