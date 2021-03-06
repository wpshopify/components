import { v4 as uuidv4 } from 'uuid';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function AccountDetailsAddress({ address }) {
  const stylesAddressLine = css`
    && {
      margin: 0;
    }
  `;

  const stylesAddress = css`
    margin-bottom: 1.1em;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.1em;

    &:last-of-type {
      border-bottom: 0;
      padding-bottom: 0;
    }
  `;

  return (
    <div className='wps-account-address' css={stylesAddress}>
      {address.name}
      {address &&
        address.formatted.map((line) => (
          <p css={stylesAddressLine} key={uuidv4()}>
            {line}
          </p>
        ))}
    </div>
  );
}

export { AccountDetailsAddress };
