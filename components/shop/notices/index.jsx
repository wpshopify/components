import { ShopContext } from '../_state/context'
import { Notices } from '../../notices'

const { useContext } = wp.element

function GlobalNotices() {
  const [shopState] = useContext(ShopContext)

  return (
    <Notices
      notices={shopState.notices}
      dropzone={document.querySelector('#wps-shop .wps-notices-global')}
      noticeGroup='global'
    />
  )
}

export { GlobalNotices }
