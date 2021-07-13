/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  getCustomer,
  isWordPressError,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';
import to from 'await-to-js';
import isEmpty from 'lodash/isEmpty';
import { CustomersContext } from '../_state/context';
import { Orders } from './orders';
import { AccountDetails } from './details';

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../notice')
);

function findDefaultAddress(addressLookup, addresses) {
  var found = find(addresses.edges, function (o) {
    return o.node.address1 === addressLookup;
  });

  if (found) {
    return found.node;
  }

  return false;
}

function AccountWrapper() {
  const { useContext, useEffect } = wp.element;
  const [customerState, customerDispatch] = useContext(CustomersContext);
  const isMountedRef = useRef(true);

  var styles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  async function getCustomerInfo() {
    if (customerState.customer) {
      return;
    }

    const [errorCust, respCust] = await to(getCustomer(customerState.user.id));

    if (errorCust) {
      customerDispatch({
        type: 'SET_NOTICES',
        payload: {
          message: errorCust,
          type: 'error',
        },
      });
    }

    if (isWordPressError(respCust)) {
      customerDispatch({
        type: 'SET_NOTICES',
        payload: {
          message: respCust.data.message,
          type: respCust.data.type,
        },
      });
    }

    customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer });
    customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: respCust.data.customer });
    customerDispatch({ type: 'SET_IS_READY', payload: true });
    // customerDispatch({ type: 'SET_INNER_PAGE', payload: false })
  }

  useEffect(() => {
    if (isMountedRef.current) {
      getCustomerInfo();
    }

    return () => (isMountedRef.current = false);
  }, [customerState.customer]);

  return !isEmpty(customerState.notices) ? (
    <Notice status={customerState.notices.type} isDismissible={false}>
      {customerState.notices.message}
    </Notice>
  ) : customerState.isAccountPage ? (
    <div css={styles}>
      <Orders />
      <AccountDetails />
    </div>
  ) : null;
}

export { AccountWrapper };
