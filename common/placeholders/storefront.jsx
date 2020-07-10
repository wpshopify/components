/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

function StorefrontPlaceholder() {
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
    min-height: 50px;
    width: 100%;
    max-width: 300px;
  `

  const content = css`
    flex: 1;
    max-width: 100%;
    min-height: 80px;
  `

  const sidebar = css`
    flex: 0 0 30%;
    width: 30%;
    padding-right: 20px;
  `

  const sidebarContent = css`
    min-height: 20px;
    margin-bottom: 10px;
    width: 100%;
  `

  const rowCSS = css`
    display: flex;
    width: 100%;
  `

  return (
    <div css={rowCSS}>
      <div css={[sidebar]}>
        <div css={[loader, sidebarContent]}></div>
        <div css={[loader, sidebarContent]}></div>
        <div css={[loader, sidebarContent]}></div>
      </div>
      <div css={[loader, content]}></div>
    </div>
  )
}

export default StorefrontPlaceholder
