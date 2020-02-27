/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductVariantButtonValue({ variant, onSelection, isSelectable }) {
  //   const [state, dispatch] = useContext(ProductVariantButtonsContext)
  //   const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext)
  //   const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  //   const isFirstRender = useRef(true)
  //   console.log('state', state)

  //   const selectedVariant = createObj(option.name, variantValue)
  var isSelected = false
  //   const isSelected = some([buyButtonState.selectedOptions], selectedVariant)
  const border = isSelected ? '#415aff' : '#313131'
  const color = isSelected ? 'white' : 'black'
  const backgroundColor = isSelected ? '#415aff' : 'transparent'
  const opacity = isSelectable ? 1 : 0.3
  const cursor = isSelectable ? 'pointer' : 'not-allowed'
  console.log('::::::::: isSelectable', isSelectable)

  const styles = css`
    margin: 0 10px 0 0;
    outline: none;
    border: 1px solid ${border};
    font-size: 1em;
    padding: 10px;
    border-radius: 5px;
    opacity: ${opacity};
    color: ${color};
    background-color: ${backgroundColor};

    &:hover {
      cursor: ${cursor};
    }
  `

  return (
    <button css={styles} onClick={onSelection} data-is-selected={isSelected}>
      {variant.value}
    </button>
  )
}

export { ProductVariantButtonValue }
