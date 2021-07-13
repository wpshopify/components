import PrettyPrice from '../../../../common/pricing/pretty';
import { prettyDate } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { CustomersContext } from '../../_state/context';
import { A } from 'hookrouter';
import { Td } from '../../../tables/body/td';
import { FulfillmentStatus } from '../details/fulfillment-status';
import { OrderStatus } from '../details/order-status';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const { useContext } = wp.element;

function Order({ order }) {
  const [customersState, customerDispatch] = useContext(CustomersContext);

  const cellLinkStyles = css`
    padding: 1em;
    width: 100%;
    display: block;
  `;

  const tableTdLink = css`
    padding: 0;
  `;

  function onClick() {
    customerDispatch({ type: 'SET_INNER_PAGE', payload: true });
    customerDispatch({ type: 'SET_SELECTED_ORDER_DETAILS', payload: order.node });
  }

  return (
    <tr>
      <Td extraCSS={tableTdLink}>
        <A
          href={'/' + wpshopify.settings.general.accountPageAccount + '/order'}
          onClick={onClick}
          css={cellLinkStyles}>
          {order.node.name}
        </A>
      </Td>
      <Td>{prettyDate(order.node.processedAt, 'MMMM dd, yyyy')}</Td>
      <Td extraCSS={tableTdLink}>
        <OrderStatus order={order.node} extraCSS={cellLinkStyles} />
      </Td>
      <Td>
        <FulfillmentStatus order={order.node} />
      </Td>
      <Td>
        <PrettyPrice
          price={order.node.totalPriceV2.amount}
          currencyCode={order.node.totalPriceV2.currencyCode}
        />
      </Td>
    </tr>
  );
}

export { Order };
