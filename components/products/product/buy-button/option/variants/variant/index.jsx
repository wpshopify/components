import { ProductOptionContext } from '../../_state/context'
import { ProductBuyButtonContext } from '../../../_state/context'
import { ProductContext } from '../../../../_state/context'

import isEmpty from 'lodash/isEmpty'
import { createObj, isPairMatch } from '../../../../../../../common/utils'

const { useEffect, useContext, useRef, useState } = wp.element
const { __ } = wp.i18n

function ProductVariant({ variant, children }) {
  const [isSelectable, setIsSelectable] = useState(true)
  const isFirstRender = useRef(true)
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const selectedVariant = createObj(variant.name, variant.value)

  function onSelection() {
    buyButtonDispatch({
      type: 'UPDATE_SELECTED_OPTIONS',
      payload: selectedVariant
    })
    productDispatch({
      type: 'TOGGLE_DROPDOWN',
      payload: false
    })
    productOptionDispatch({
      type: 'TOGGLE_DROPDOWN',
      payload: false
    })
    productOptionDispatch({
      type: 'SET_IS_OPTION_SELECTED',
      payload: true
    })
    productOptionDispatch({
      type: 'SET_SELECTED_OPTION',
      payload: selectedVariant
    })

    wp.hooks.doAction('on.product.variant.selection', selectedVariant, productOptionState)
  }

  useEffect(() => {
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

    if (isPairMatch(buyButtonState.availableVariants, selectedVariant)) {
      setIsSelectable(true)
    } else {
      setIsSelectable(false)
    }
  }, [buyButtonState.availableVariants])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    buyButtonDispatch({
      type: 'SET_AVAILABLE_VARIANTS',
      payload: productOptionState.selectedOption
    })
  }, [productOptionState.selectedOption])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isEmpty(buyButtonState.selectedOptions)) {
      setIsSelectable(true)
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false
      })
    }
  }, [buyButtonState.selectedOptions])

  return wp.element.cloneElement(children, {
    onSelection: onSelection,
    isSelectable: isSelectable,
    variant: variant
  })
}

function ProductVariantDropdownValue({ variant, onSelection, isSelectable }) {
  return (
    isSelectable && (
      <li
        itemProp='category'
        className='wps-product-variant wps-product-style wps-modal-close-trigger'
        onClick={onSelection}>
        {wp.hooks.applyFilters(
          'products.variant.title.text',
          __(variant.value, wpshopify.misc.textdomain)
        )}
      </li>
    )
  )
}

export { ProductVariant, ProductVariantDropdownValue }
