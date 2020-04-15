import { v4 as uuidv4 } from 'uuid'
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
      {notices && (
        <section className={'wps-notices-' + noticeGroup}>
          {notices.map((notice) => (
            <Notice key={uuidv4()} status={notice.type} isDismissible={false}>
              {checkForErrorObj(notice.message)}
            </Notice>
          ))}
        </section>
      )}
    </>,
    findPortalElement(dropzone)
  )
}

export { Notices }
