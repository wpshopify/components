import React, {useContext} from 'react'
import uuidv4 from 'uuid/v4'
import { ShopContext } from '../_state/context'
import { Notice } from '../../notice'
import { usePortal } from '../../../common/hooks'
import { findPortalElement } from '../../../common/utils'

function GlobalNotices() {

   const [shopState] = useContext(ShopContext)

   return usePortal(
      <>
         <section className="wps-notices-global">
            {shopState.notices.map(n => <Notice key={uuidv4()} type={n.type} message={n.message} />)}
         </section>
      </>,
      findPortalElement(document.querySelector(shopState.settings.layout.globalNoticesDropzone))
   )

}

export { GlobalNotices }