import uuidv4 from 'uuid/v4'
import { usePortal } from '../../common/hooks'
import { findPortalElement } from '../../common/utils'

const { Notice } = wp.components

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
          <Notice key={uuidv4()} status={n.type} isDismissible={false}>
            {checkForErrorObj(n.message)}
          </Notice>
        ))}
      </section>
    </>,
    findPortalElement(dropzone)
  )
}

export { Notices }
