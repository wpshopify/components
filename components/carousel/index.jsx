import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { mq } from '../../common/css';

function Carousel({ children, payloadSettings }) {
  const CarouselCSS = css`
    max-width: 1100px;
    margin: 0 auto;

    .slick-next,
    .slick-prev {
      top: calc(50% - 30px);
      width: 55px;
      height: 55px;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;

      &:hover,
      &:focus {
        opacity: 0.7;
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }

      &:before {
        color: black;
        font-size: 35px;
        content: '';
      }
    }

    .slick-prev {
      left: -55px;
    }

    .slick-next {
      right: -55px;
    }

    .slick-prev,
    .slick-prev:hover,
    .slick-prev:focus {
      background-image: url(${'"' + payloadSettings.carouselPrevArrow + '"'});
    }

    .slick-next,
    .slick-next:hover,
    .slick-next:focus {
      background-image: url(${'"' + payloadSettings.carouselNextArrow + '"'});
    }

    .slick-slide {
      padding: 0 7px;
    }

    .slick-dots li button:before {
      width: 25px;
      height: 25px;
      font-size: 10px;
    }

    ${mq('large')} {
      display: table !important;
      table-layout: fixed !important;
      width: 100% !important;

      .slick-prev {
        left: 0;
        z-index: 999;
      }

      .slick-next {
        right: 0;
        z-index: 999;
      }

      .slick-list {
        width: 75%;
        margin: 0 auto;
      }
    }

    ${mq('medium')} {
      .slick-prev,
      .slick-next {
        width: 35px;
        height: 35px;
      }
    }
  `;

  const settings = wp.hooks.applyFilters('wpshopify.carousel.settings', {
    dots: payloadSettings.carouselDots,
    infinite: payloadSettings.carouselInfinite,
    speed: payloadSettings.carouselSpeed,
    slidesToShow: payloadSettings.carouselSlidesToShow,
    slidesToScroll: payloadSettings.carouselSlidesToScroll,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  return (
    <Slider {...settings} css={CarouselCSS}>
      {children}
    </Slider>
  );
}

export default Carousel;
