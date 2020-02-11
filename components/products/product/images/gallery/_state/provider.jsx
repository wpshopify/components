import { ProductGalleryReducer } from './reducer'
import { ProductGalleryInitialState } from './initial-state'
import { ProductGalleryContext } from './context'

function ProductGalleryProvider(props) {
  const [state, dispatch] = wp.element.useReducer(
    ProductGalleryReducer,
    ProductGalleryInitialState(props.productState)
  )

  const value = wp.element.useMemo(() => [state, dispatch], [state])

  return <ProductGalleryContext.Provider value={value} {...props} />
}

export { ProductGalleryProvider }
