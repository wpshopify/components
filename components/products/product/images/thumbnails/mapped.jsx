import ProductThumbnailImage from '../thumbnail';

function ThumbnailsMapped({ thumbnails, payloadSettings }) {
  return thumbnails.map((image) => (
    <ProductThumbnailImage key={image.src} image={image} payloadSettings={payloadSettings} />
  ));
}

const Thumbnails = wp.element.memo(ThumbnailsMapped);

export default Thumbnails;
