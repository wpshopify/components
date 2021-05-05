import { ShopContext } from '../_state/context';
const { useContext } = wp.element;

const Notices = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notices-public' */ '../../notices')
);

function GlobalNotices() {
  const [shopState] = useContext(ShopContext);

  return shopState.notices.length ? (
    <Notices notices={shopState.notices && shopState.notices} noticeGroup='global' />
  ) : null;
}

export { GlobalNotices };
