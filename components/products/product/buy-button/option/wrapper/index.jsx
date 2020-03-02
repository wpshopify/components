import { ProductOptionContext } from '../_state/context'
import { ProductBuyButtonContext } from '../../_state/context'
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
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const isFirstRender = useRef(true)

  useEffect(() => {
    console.log('0')
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!isPairMatch(buyButtonState.availableVariants, productOptionState.selectedOption)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false
      })
      buyButtonDispatch({
        type: 'UNSET_SELECTED_OPTIONS',
        payload: productOptionState.option.name
      })
    }
  }, [buyButtonState.availableVariants])

  useEffect(() => {
    console.log('1')
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isEmpty(productOptionState.selectedOption)) {
      return
    }

    buyButtonDispatch({
      type: 'SET_AVAILABLE_VARIANTS',
      payload: productOptionState.selectedOption
    })
  }, [productOptionState.selectedOption])

  useEffect(() => {
    console.log('2')

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isEmpty(buyButtonState.availableVariants) && isEmpty(buyButtonState.selectedOptions)) {
      return
    }

    if (isEmpty(buyButtonState.selectedOptions)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false
      })

      productOptionDispatch({
        type: 'SET_SELECTED_OPTION',
        payload: {}
      })

      return
    }

    if (allOptionsSelectedMatch(buyButtonState.selectedOptions, buyButtonState.product)) {
      buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: true })

      productDispatch({
        type: 'SET_SELECTED_VARIANT',
        payload: {
          product: buyButtonState.product,
          selectedOptions: buyButtonState.selectedOptions
        }
      })

      wp.hooks.doAction('before.product.addToCart', buyButtonState)
    }
  }, [buyButtonState.selectedOptions])

  return children
}

export { ProductOptionWrapper }
