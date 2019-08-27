/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

const slide = keyframes`
0% {
   transform: translateX(20px);
   opacity: 0;
}

100% {
   transform: translateX(0);
   opacity: 1;
}`

const stylesSlideIn = css`
   animation: ${slide} 0.35s ease;
   animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
`

export { stylesSlideIn }
