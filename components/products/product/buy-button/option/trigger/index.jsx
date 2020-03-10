import { ProductBuyButtonContext } from '../../_state/context'
import { useAnime, pulse } from '../../../../../../common/animations'
import { FilterHook } from '../../../../../../common/utils'
import { ShopContext } from '../../../../../shop/_state/context'
import { ItemsContext } from '../../../../../items/_state/context'
import { ProductOptionContext } from '../_state/context'

const { useEffect, useContext, useRef } = wp.element
const { __ } = wp.i18n

function TriggerIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 30 30'
      style={{ 'max-width': '19px', position: 'absolute', right: '16px' }}>
      <path fill='#fff' d='M15 17.8L3.2 6 .7 8.7 15 23 29.3 8.7 26.8 6z' />
    </svg>
  )
}

function ProductOptionTrigger() {
  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)

  const dropdownTrigger = useRef()
  const animePulse = useAnime(pulse)
  const isFirstRender = useRef(true)

  function onClick() {
    console.log('onClick')

    wp.hooks.doAction('before.product.variantDropdown.toggle', productOptionState)

    productOptionDispatch({ type: 'TOGGLE_DROPDOWN', payload: !productOptionState.isDropdownOpen })
  }

  /*

   When buyButtonState.missingSelections changes ...

   */
  useEffect(() => {
    if (!shopState.isShopReady) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!buyButtonState.missingSelections) {
      return
    }

    if (!isOptionSelected()) {
      animePulse(dropdownTrigger.current)
    }
  }, [buyButtonState.missingSelections])

  function isOptionSelected() {
    return productOptionState.isOptionSelected
  }

  function optionName() {
    return productOptionState.option.name
  }

  function getOptionName(selectedOption, option) {
    return selectedOption[option.name]
  }

  function getSelectedOption() {
    return productOptionState.selectedOption
  }

  function optionNameWithSelect() {
    return optionName() + ': ' + getOptionName(getSelectedOption(), productOptionState.option)
  }

  function displayOptionName() {
    return isOptionSelected() ? optionNameWithSelect() : optionName()
  }

  return (
    <button
      className='wps-btn wps-icon wps-icon-dropdown wps-modal-trigger'
      data-option=''
      data-option-id=''
      data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
      onClick={onClick}
      ref={dropdownTrigger}
      style={{ backgroundColor: itemsState.payloadSettings.variantButtonColor }}>
      <FilterHook name='products.option.title.text'>
        {__(displayOptionName(), wpshopify.misc.textdomain)}
      </FilterHook>
      <TriggerIcon />
    </button>
  )
}

export default ProductOptionTrigger
