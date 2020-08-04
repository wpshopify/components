import { ProductOptionContext } from '../_state/context'
import { ProductContext } from '../../../_state/context'

import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import { isPairMatch } from '../../../../../../common/utils'

const { useContext, useEffect, useRef } = wp.element

function allOptionsSelectedMatch(onlySelectedOptions, product) {
  return size(onlySelectedOptions) === product.options.length
}

function ProductOptionWrapper({ children }) {
  const [productState, productDispatch] = useContext(ProductContext)
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!isPairMatch(productState.availableVariants, productOptionState.selectedOption)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false,
      })
      productDispatch({
        type: 'UNSET_SELECTED_OPTIONS',
        payload: productOptionState.option.name,
      })
    }
  }, [productState.availableVariants])

  useEffect(() => {
    if (isFirstRender.current) {
      console.log('YEP FIRST')

      isFirstRender.current = false
      return
    }

    if (isEmpty(productOptionState.selectedOption)) {
      return
    }

    productDispatch({
      type: 'SET_AVAILABLE_VARIANTS',
      payload: productOptionState.selectedOption,
    })
  }, [productOptionState.selectedOption])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isEmpty(productState.availableVariants) && isEmpty(productState.selectedOptions)) {
      return
    }

    if (isEmpty(productState.selectedOptions)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false,
      })

      productOptionDispatch({
        type: 'SET_SELECTED_OPTION',
        payload: {},
      })

      return
    }

    if (allOptionsSelectedMatch(productState.selectedOptions, productState.payload)) {
      productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: true })

      productDispatch({
        type: 'SET_SELECTED_VARIANT',
        payload: {
          payload: productState.payload,
          selectedOptions: productState.selectedOptions,
        },
      })

      wp.hooks.doAction('before.product.addToCart', productState)
    } else {
      productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
    }
  }, [productState.selectedOptions])

  return children
}

export default ProductOptionWrapper
