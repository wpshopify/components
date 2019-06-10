import React, { useContext } from 'react'
import { ShopContext } from '../_state/context'
import { Notices } from '../../notices'

function GlobalNotices() {
   const [shopState] = useContext(ShopContext)

   return <Notices notices={shopState.notices} dropzone={document.querySelector(shopState.settings.layout.globalNoticesDropzone)} noticeGroup='global' />
}

export { GlobalNotices }
