/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';

function ProductBuyButtonPlaceholder() {
  const shimmer = keyframes`
      0% {
        background-position: -468px 0;
      }

      100% {
        background-position: 468px 0;
      }
`;

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
  `;

  const variants = css`
    max-width: 250px;
    display: flex;
    justify-content: space-between;
    background: transparent !important;
  `;

  const variant = css`
    max-width: 55px;
    margin: 0 !important;
  `;

  const buyButton = css`
    max-width: 250px;
    min-height: 40px;
  `;

  return (
    <div>
      <div css={[loader, variants]}>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
        <div css={[loader, variant]}></div>
      </div>
      <div css={[loader, buyButton]}></div>
    </div>
  );
}

export default ProductBuyButtonPlaceholder;
