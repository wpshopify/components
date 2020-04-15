import { ShopContext } from '../_state/context'
import { Notices } from '../../notices'

const { useContext } = wp.element

function GlobalNotices() {
  const [shopState] = useContext(ShopContext)

  return (
    <Notices
      notices={shopState.notices && shopState.notices}
      dropzone={document.querySelector('#wpshopify-notices')}
      noticeGroup='global'
    />
  )
}

export { GlobalNotices }
