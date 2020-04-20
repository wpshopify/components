import {
  getCustomer,
  isWordPressError,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CustomersContext } from '../_state/context'
import { Orders } from './orders'
import { AccountDetails } from './details'

const { Notice } = wp.components

const { useContext, useEffect } = wp.element

function findDefaultAddress(addressLookup, addresses) {
  var found = find(addresses.edges, function (o) {
    return o.node.address1 === addressLookup
  })

  if (found) {
    return found.node
  }

  return false
}

function AccountWrapper() {
  const [customerState, customerDispatch] = useContext(CustomersContext)
  const isMountedRef = useRef(true)

  var styles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  }

  async function getCustomerInfo() {
    if (customerState.customer) {
      return
    }

    const [errorCust, respCust] = await to(getCustomer(customerState.user.id))

    if (isWordPressError(respCust)) {
      customerDispatch({
        type: 'SET_NOTICES',
        payload: {
          message: respCust.data.message,
          type: respCust.data.type,
        },
      })
    }

    if (!errorCust) {
      customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer })
      customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: respCust.data.customer })
    }

    customerDispatch({ type: 'SET_IS_READY', payload: true })

    // customerDispatch({ type: 'SET_INNER_PAGE', payload: false })
  }

  useEffect(() => {
    if (isMountedRef.current) {
      getCustomerInfo()
    }

    return () => (isMountedRef.current = false)
  }, [customerState.customer])

  return !isEmpty(customerState.notices) ? (
    <Notice status={customerState.notices.type} isDismissible={false}>
      {customerState.notices.message}
    </Notice>
  ) : (
    customerState.isAccountPage && (
      <div css={styles}>
        <Orders />
        <AccountDetails />
      </div>
    )
  )
}

export { AccountWrapper }
