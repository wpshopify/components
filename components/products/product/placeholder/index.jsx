/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPlaceholder() {
  const loader = css`
    transition: background 0.6s ease !important;
    color: transparent !important;
    animation-duration: 0.7s !important;
    animation-fill-mode: forwards !important;
    animation-iteration-count: infinite !important;
    animation-name: shimmer !important;
    animation-timing-function: linear !important;
    background: linear-gradient(to right, #ececec 8%, #f4f4f4 38%, #ececec 54%) !important;
    background-size: 1000px 640px !important;
    border-radius: 9px !important;
    position: relative !important;
    margin: 5px 20px 15px 20px !important;
    border: none !important;
    min-height: 20px;
    width: 100%;
    max-width: 300px;
  `

  const image = css`
    height: 200px;
  `

  const title = css`
    max-width: 200px;
  `

  const price = css`
    max-width: 160px;
  `

  const variants = css`
    max-width: 250px;
    display: flex;
    justify-content: space-between;
    background: transparent !important;
  `

  const variant = css`
    max-width: 55px;
    margin: 0 !important;
  `

  const buyButton = css`
    max-width: 250px;
    min-height: 40px;
  `

  return (
    <div>
      <div css={[loader, image]}></div>
      <div css={[loader, title]}></div>
      <div css={[loader, price]}></div>
      <div css={[loader, variants]}>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
      </div>
      <div css={[loader, buyButton]}></div>
    </div>
  )
}

export default ProductPlaceholder
