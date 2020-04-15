import { ProductVariants } from '../variants'
import { ProductOptionContext } from '../_state/context'

import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const { useContext } = wp.element

const ProductOptionTrigger = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionTrigger' */ '../trigger')
)

function ProductOptionDropdown() {
  const [productOptionState] = useContext(ProductOptionContext)

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
          flip={false}
          theme='light'
          interactive={true}
          inertia={true}
          delay={[0, 0]}
          content={<ProductVariants />}>
          <span>
            <ProductOptionTrigger />
          </span>
        </Tippy>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
