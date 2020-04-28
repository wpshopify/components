import { CustomersContext } from '../../_state/context'
import { stylesSlideIn } from '../../_styles'
import { A } from 'hookrouter'
import { AccountDetailsDefaultAddress } from '../details/address/default-address'
import { AccountDetailsAddresses } from '../details/address/addresses'
import { AccountAddressControls } from '../details/address/address-controls'
import { AddressesProvider } from './_state/provider'
import { AddressesHeader } from './header'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext, useEffect } = wp.element

function withoutDefault(addresses, lookup) {
  return addresses.filter((address) => address.node.address1 !== lookup)
}

function Addresses() {
  const [customerState, customersDispatch] = useContext(CustomersContext)

  const stylesWrap = css`
    display: flex;
    margin-bottom: 2em;
  `

  const stylesInner = css`
    margin-right: 2em;
  `

  useEffect(() => {
    customersDispatch({ type: 'SET_SELECTED_ADDRESS', payload: false })
  }, [customerState.customer.addresses])

  return (
    <AddressesProvider>
      <section css={stylesSlideIn}>
        <AddressesHeader />

        {customerState.customer.addresses && (
          <div css={stylesWrap}>
            <div css={stylesInner}>
              <h3>Default Address</h3>
              <AccountDetailsDefaultAddress />
              <AccountAddressControls address={customerState.defaultAddress} />
            </div>

            <div css={stylesInner}>
              <h3>Other Addresses</h3>

              <AccountDetailsAddresses
                addresses={withoutDefault(
                  customerState.customer.addresses.edges,
                  customerState.defaultAddress.address1
                )}
              />
            </div>
          </div>
        )}

        <A
          href={'/' + wpshopify.settings.general.accountPageAccount + '/addresses/add'}
          className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
          Add new address
        </A>
      </section>
    </AddressesProvider>
  )
}

export { Addresses }
