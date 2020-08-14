/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

function ProductPlaceholder() {
  const shimmer = keyframes`
      0% {
        background-position: -468px 0;
      }

      100% {
        background-position: 468px 0;
      }
`

  const loader = css`
    transition: background 1s ease;
    color: transparent;
    animation: ${shimmer} 1s ease-out 0s infinite normal forwards;
    background: linear-gradient(to right, #ececec 8%, #f4f4f4 38%, #ececec 54%);
    background-size: 1000px 640px;
    border-radius: 9px;
    position: relative;
    margin: 5px 20px 15px 20px;
    border: none;
    min-height: 20px;
    width: 100%;
    max-width: 300px;
  `

  const image = css`
    height: 200px;
  `

  return <div css={[loader, image]}></div>
}

export default ProductPlaceholder
