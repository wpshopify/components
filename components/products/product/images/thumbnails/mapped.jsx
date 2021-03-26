import ProductThumbnailImage from '../thumbnail';
import { v4 as uuidv4 } from 'uuid';

function ThumbnailsMapped({ thumbnails, payloadSettings }) {
  return thumbnails.map((image) => (
    <ProductThumbnailImage key={uuidv4()} image={image} payloadSettings={payloadSettings} />
  ));
}

const Thumbnails = wp.element.memo(ThumbnailsMapped);

export default Thumbnails;
