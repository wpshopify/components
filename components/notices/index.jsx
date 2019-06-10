import React from 'react'
import uuidv4 from 'uuid/v4'
import { Notice } from './notice'
import { usePortal } from '../../common/hooks'
import { findPortalElement } from '../../common/utils'

function Notices({ notices, dropzone, noticeGroup }) {
   return usePortal(
      <>
         <section className={'wps-notices-' + noticeGroup}>
            {notices.map(n => (
               <Notice key={uuidv4()} type={n.type} message={n.message} />
            ))}
         </section>
      </>,
      findPortalElement(dropzone)
   )
}

export { Notices }
