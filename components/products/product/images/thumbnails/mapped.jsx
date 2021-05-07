import ProductThumbnailImage from '../thumbnail';

function ThumbnailsMapped({ payload, thumbnails, payloadSettings }) {
  return thumbnails.map((image) => (
    <ProductThumbnailImage
      key={image.src}
      image={image}
      payload={payload}
      payloadSettings={payloadSettings}
    />
  ));
}

const Thumbnails = wp.element.memo(ThumbnailsMapped);

export default Thumbnails;
