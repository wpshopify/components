import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

function Carousel({ children }) {
  const CarouselCSS = css`
    max-width: 1100px;
    margin: 0 auto;

    .slick-prev {
      left: -55px;
    }

    .slick-next {
      right: -55px;
    }

    .slick-next,
    .slick-prev {
      width: 55px;
      height: 55px;

      &:before {
        color: black;
        font-size: 35px;
      }
    }

    .slick-slide {
      padding: 0 7px;
    }

    .slick-dots li button:before {
      width: 25px;
      height: 25px;
      font-size: 10px;
    }
  `;

  const settings = wp.hooks.applyFilters('wpshopify.carousel.settings', {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  });

  return (
    <Slider {...settings} css={CarouselCSS}>
      {children}
    </Slider>
  );
}

export default Carousel;
