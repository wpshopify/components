import { ProductOptionContext } from '../_state/context'
import { ProductBuyButtonContext } from '../../_state/context'

const { useContext } = wp.element
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import Tippy from '@tippyjs/react'

import ProductOptionTrigger from '../trigger'
import ProductVariantsDropdown from '../variants'

function ProductOptionDropdown() {
  const [productOptionState] = useContext(ProductOptionContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)

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
          content={
            <ProductVariantsDropdown
              dropdownElement={productOptionState.dropdownElement}
              isDropdownOpen={productOptionState.isDropdownOpen}
              isOptionSelected={productOptionState.isOptionSelected}
              option={productOptionState.option}
              availableVariants={buyButtonState.availableVariants}
              selectedOptions={buyButtonState.selectedOptions}
              buyButtonDispatch={buyButtonDispatch}
            />
          }>
          <span>
            <ProductOptionTrigger />
          </span>
        </Tippy>
      </div>
    </div>
  )
}

export default ProductOptionDropdown
