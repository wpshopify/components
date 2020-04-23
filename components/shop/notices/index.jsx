import { ShopContext } from '../_state/context'
import { Notices } from '../../notices'
const { useContext } = wp.element

function GlobalNotices() {
  const [shopState] = useContext(ShopContext)
  console.log('shopState', shopState)

  return <Notices notices={shopState.notices && shopState.notices} noticeGroup='global' />
}

export { GlobalNotices }
