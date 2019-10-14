import React, { useContext } from 'react'
import { ShopContext } from '../_state/context'
import { Notices } from '../../notices'

function GlobalNotices() {
   const [shopState] = useContext(ShopContext)

   return <Notices notices={shopState.notices} dropzone={document.querySelector('#wps-shop .wps-notices-global')} noticeGroup='global' />
}

export { GlobalNotices }
