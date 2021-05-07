/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Carousel from '../../../../carousel';
import { mq } from '../../../../../common/css';

function ProductCarouselImages({ payloadSettings, images }) {
  const ProductCarouselImagesCSS = css`
    margin-bottom: 30px;
  `;

  const ProductCarouselSliderCSS = css`
    .slick-list {
      ${mq('large')} {
        width: 100%;
      }
    }

    .slick-next {
      right: 7px;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgkgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMzI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOTIgMzI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODcuOCwxNzAuNUw0MSwzMTguNWMtNC43LDQuNy0xMi4zLDQuNy0xNywwTDQuMiwyOTguN2MtNC43LTQuNy00LjctMTIuMywwLTE3TDEyMi43LDE2Mkw0LjIsNDIuMwoJYy00LjctNC43LTQuNy0xMi4zLDAtMTdMMjQsNS41YzQuNy00LjcsMTIuMy00LjcsMTcsMGwxNDYuOCwxNDhDMTkyLjUsMTU4LjIsMTkyLjUsMTY1LjgsMTg3LjgsMTcwLjV6Ii8+Cjwvc3ZnPgo=');
    }

    .slick-prev {
      left: 7px;
      z-index: 99;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgkgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMzI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOTIgMzI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjIsMTUzLjVMMTUxLDUuNWM0LjctNC43LDEyLjMtNC43LDE3LDBsMTkuOCwxOS44YzQuNyw0LjcsNC43LDEyLjMsMCwxN0w2OS4zLDE2MmwxMTguNSwxMTkuNwoJYzQuNyw0LjcsNC43LDEyLjMsMCwxN0wxNjgsMzE4LjVjLTQuNyw0LjctMTIuMyw0LjctMTcsMEw0LjIsMTcwLjVDLTAuNSwxNjUuOC0wLjUsMTU4LjIsNC4yLDE1My41eiIvPgo8L3N2Zz4K');
    }

    .slick-next,
    .slick-prev {
      transition: all ease 0.2s;
      visibility: ${wpshopify.misc.isMobile ? 'visible' : 'hidden'};
      opacity: ${wpshopify.misc.isMobile ? 1 : 0};
      background-repeat: no-repeat;
      text-align: center;
      background-position: 45% 50%;
      background-size: 13px;
      padding: 70px 25px;
      top: calc(50% - 10px);
    }

    &:hover {
      .slick-next,
      .slick-prev {
        visibility: visible;
        opacity: 1;
      }
    }
  `;

  return wpshopify.misc.isPro ? (
    <div css={ProductCarouselImagesCSS}>
      <Carousel
        payloadSettings={payloadSettings}
        customSettings={{
          slidesToScroll: 1,
          slidesToShow: 1,
          adaptiveHeight: true,
        }}
        extraCSS={ProductCarouselSliderCSS}>
        {images.map((image) => (
          <img key={image.src} src={image.src} alt={image.altText} />
        ))}
      </Carousel>
    </div>
  ) : (
    null()
  );
}

export default ProductCarouselImages;
