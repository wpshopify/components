import { v4 as uuidv4 } from 'uuid';
import { AccountDetailsAddress } from './address';
import { AccountAddressControls } from './address-controls';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function AccountDetailsAddresses({ addresses }) {
  const style = css`
    margin-bottom: 2em;
  `;

  return (
    addresses &&
    addresses.map((address) => (
      <div key={uuidv4()} css={style} className='address address-other'>
        <AccountDetailsAddress address={address.node} />
        <AccountAddressControls address={address.node} />
      </div>
    ))
  );
}

export { AccountDetailsAddresses };
