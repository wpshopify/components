import React from 'react'
import uuidv4 from 'uuid/v4'
import { Notice } from './notice'
import { usePortal } from '../../common/hooks'
import { findPortalElement } from '../../common/utils'

function Notices({ notices, dropzone, noticeGroup }) {
   function checkForErrorObj(maybeError) {
      if (maybeError instanceof Error) {
         return maybeError.message
      } else {
         return maybeError
      }
   }
   return usePortal(
      <>
         <section className={'wps-notices-' + noticeGroup}>
            {notices.map(n => (
               <Notice key={uuidv4()} type={n.type} message={checkForErrorObj(n.message)} />
            ))}
         </section>
      </>,
      findPortalElement(dropzone)
   )
}

export { Notices }
