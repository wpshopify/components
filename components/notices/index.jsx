import { v4 as uuidv4 } from 'uuid'
import { usePortal } from '../../common/hooks'
import { findPortalElement } from '../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
const { Notice } = wp.components

function Notices({ notices, dropzone, noticeGroup }) {
  function checkForErrorObj(maybeError) {
    if (maybeError instanceof Error) {
      return maybeError.message
    } else {
      return maybeError
    }
  }

  const noticeInnerStyles = css`
    margin-bottom: 30px;
    width: 100%;
  `

  const noticeStyles = css`
    max-width: 500px;
    margin: 0 auto;
  `

  return usePortal(
    <>
      {notices && (
        <section className={'wps-notices-' + noticeGroup} css={noticeStyles}>
          {notices.map((notice) => (
            <Notice
              key={uuidv4()}
              status={notice.type}
              isDismissible={false}
              css={noticeInnerStyles}>
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
