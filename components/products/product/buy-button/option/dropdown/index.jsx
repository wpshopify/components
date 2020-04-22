import { ProductOptionContext } from '../_state/context'
const { useContext, useState } = wp.element
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Tippy from '@tippyjs/react'

const ProductOptionTrigger = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionTrigger' */ '../trigger')
)

const ProductVariantsDropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductVariantsDropdown' */ '../variants')
)

function ProductOptionDropdown() {
  const [productOptionState] = useContext(ProductOptionContext)
  useState()

  return (
    <div className='row'>
      <div
        className='wps-btn-dropdown'
        data-wps-is-selected={productOptionState.isOptionSelected}
        ref={productOptionState.dropdownElement}>
        <Tippy
          visible={productOptionState.isDropdownOpen}
          placement='bottom'
          allowHTML={true}
          appendTo='parent'
          arrow={false}
          animation='shift-away'
          theme='light'
          interactive={true}
          inertia={true}
          delay={[0, 0]}
          offset={[0, 15]}
          content={<ProductVariantsDropdown />}>
          <span>
            <ProductOptionTrigger />
          </span>
        </Tippy>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
