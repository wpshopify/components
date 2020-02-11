import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'
import { AccountAddressControls } from './address-controls'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetailsAddresses({ addresses }) {
  const style = css`
    margin-bottom: 2em;
  `

  return (
    addresses &&
    addresses.map(address => (
      <div key={uuidv4()} css={style} className='address address-other'>
        <AccountDetailsAddress address={address.node} />
        <AccountAddressControls address={address.node} />
      </div>
    ))
  )
}

export { AccountDetailsAddresses }
