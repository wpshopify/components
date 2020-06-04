/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Img(props) {
  function isSelectedImage() {
    if (props.isFeatured) {
      return
    }

    return props.galleryState.featImage.src === props.image.src
  }

  const featThumbStyles = css`
    outline: 1px dashed #000000;
    outline-offset: 3px;
    transition: transform 100ms ease;

    &:hover {
      opacity: 1;
    }
  `

  const thumbnailStyles = css`
    display: block;
    margin-bottom: 10px;

    &:focus,
    &:active {
      outline: 1px dashed #000000;
      outline-offset: 3px;
    }
  `

  return (
    <img
      css={isSelectedImage() ? featThumbStyles : thumbnailStyles}
      ref={props.imageRef}
      itemProp='image'
      src={props.productImageSrc}
      className='wps-product-image lazyload'
      alt={props.image.altText}
      data-zoom={props.image.src}
    />
  )
}

export default wp.element.memo(Img)
