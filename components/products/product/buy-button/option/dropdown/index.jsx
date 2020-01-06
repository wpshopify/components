import React, { useContext, useEffect, useRef } from "react"
import { ProductVariants } from "../variants"
import { ProductBuyButtonContext } from "../../_state/context"
import { ProductContext } from "../../../_state/context"
import { ProductOptionContext } from "../_state/context"

import find from "lodash/find"
import isEmpty from "lodash/isEmpty"
import Tippy from "@tippy.js/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/shift-away.css"

const ProductOptionTrigger = React.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionTrigger' */ "../trigger")
)

function ProductOptionDropdown() {
  const [buyButtonState, buyButtonDispatch] = useContext(
    ProductBuyButtonContext
  )
  const [productOptionState, productOptionDispatch] = useContext(
    ProductOptionContext
  )
  const [productState] = useContext(ProductContext)

  const isFirstRender = useRef(true)

  // When buyButtonState.availableVariants changes ...
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    var optionIsAvailable = find(
      buyButtonState.availableVariants,
      productOptionState.selectedOption
    )

    if (optionIsAvailable === undefined) {
      productOptionDispatch({ type: "SET_IS_OPTION_SELECTED", payload: false })
      buyButtonDispatch({
        type: "UNSET_SELECTED_OPTIONS",
        payload: productOptionState.option.name
      })
    }
  }, [buyButtonState.availableVariants])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isEmpty(buyButtonState.selectedOptions)) {
      productOptionDispatch({ type: "SET_IS_OPTION_SELECTED", payload: false })
    }
  }, [buyButtonState.selectedOptions])

  return (
    <div className="row">
      <div
        className="wps-btn-dropdown"
        data-wps-is-selected={productOptionState.isOptionSelected}
        ref={productOptionState.dropdownElement}
      >
        <Tippy
          visible={productOptionState.isDropdownOpen}
          placement="bottom"
          allowHTML={true}
          appendTo="parent"
          arrow={false}
          animation="shift-away"
          flip={false}
          theme="light"
          interactive={true}
          inertia={true}
          delay={[0, 0]}
          content={<ProductVariants />}
        >
          <span>
            <ProductOptionTrigger />
          </span>
        </Tippy>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
