import { AddressForm } from './address-form';
import { AccountDetailsAddress } from './address';
import { AccountReturn } from '../../return';
import { CustomersContext } from '../../../_state/context';
import { stylesSlideIn } from '../../../_styles';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const { useContext } = wp.element;

function AddressFormEdit() {
  const [customerState] = useContext(CustomersContext);

  return (
    <section css={stylesSlideIn}>
      <AccountReturn path='/addresses' text='Return to Addresses' onInner={true} />

      <h2>Currently Editing Address:</h2>

      <AddressForm type='edit' address={customerState.selectedAddress} />
    </section>
  );
}

export { AddressFormEdit };
