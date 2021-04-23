import { v4 as uuidv4 } from 'uuid';
import { usePortal } from '../../common/hooks';
import { findPortalElement } from '../../common/utils';

import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react';

function Notice({ children, status, extraCSS = false }) {
  const slideInFromTop = keyframes`
      0% {
         opacity: 0;
         transform: translateY(-10px);
      }
      100% {
         opacity: 1;
         transform: translateY(0);
      }
   `;

  const noticeStyles = css`
    margin: 0;
    background-color: ${status === 'warning'
      ? '#fef8e7'
      : status === 'info'
      ? '#e8f5f9'
      : status === 'error'
      ? '#f8ebea'
      : '#eef6ee'};
    padding: 0.6em 1.1em;
    border-left: 0.35em solid
      ${status === 'warning'
        ? '#f0b849'
        : status === 'info'
        ? '#419ecd'
        : status === 'error'
        ? '#cd423b'
        : '#4db54f'};
    animation: 0.2s ease ${slideInFromTop};
    font-size: 15px;
  `;

  return <p css={[noticeStyles, extraCSS]}>{children}</p>;
}

function Notices({ notices, dropzone = false, noticeGroup = '' }) {
  function checkForErrorObj(maybeError) {
    if (maybeError instanceof Error) {
      return maybeError.message;
    }

    if (isString(maybeError)) {
      return maybeError;
    }

    if (isObject(maybeError)) {
      return maybeError.message;
    }

    return wp.i18n.__(
      'Uh oh, it looks like an error occured. Please clear your browser cache and try again.',
      'wpshopify'
    );
  }

  const noticeInnerStyles = css`
    margin-bottom: 30px;
    width: 100%;
  `;

  const noticeStyles = css`
    max-width: 600px;
    margin: 0 auto;
  `;

  return usePortal(
    notices && notices.length ? (
      <section className={'wps-notices-' + noticeGroup} css={noticeStyles}>
        {notices.map((notice) => (
          <Notice key={uuidv4()} status={notice.type} isDismissible={false} css={noticeInnerStyles}>
            {checkForErrorObj(notice.message)}
          </Notice>
        ))}
      </section>
    ) : (
      ''
    ),
    findPortalElement(dropzone)
  );
}

export { Notices, Notice };
