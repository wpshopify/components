import { v4 as uuidv4 } from 'uuid';
import { usePortal } from '../../common/hooks';
import { findPortalElement } from '../../common/utils';

import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function Notices({ notices, dropzone = false, noticeGroup = '' }) {
  const { Notice } = wp.components;

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

export { Notices };
