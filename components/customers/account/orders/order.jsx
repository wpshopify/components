import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { prettyDate } from '../../../../common/utils'
import { ShopContext } from '../../../shop/_state/context'
import { CustomersContext } from '../../_state/context'
import isEmpty from 'lodash/isEmpty'
import { A } from 'hookrouter'
import { Td } from '../../../tables/body/td'
import { FulfillmentStatus } from '../details/fulfillment-status'
import { OrderStatus } from '../details/order-status'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Order({ order }) {
   const [shopState] = useContext(ShopContext)
   const [customersState, customerDispatch] = useContext(CustomersContext)

   const stylesthtd = {
      textAlign: 'left',
      padding: '15px',
      border: '1px solid #e7e7e7'
   }

   const stylesOrderLink = {
      textDecoration: 'underline',
      color: '#3ba9fc',
      ':hover': {
         cursor: 'pointer'
      }
   }

   const cellLinkStyles = css`
      padding: 1em;
      width: 100%;
      display: block;
   `

   const tableTdLink = css`
      padding: 0;
   `

   function onClick() {
      customerDispatch({ type: 'SET_INNER_PAGE', payload: true })
      customerDispatch({ type: 'SET_SELECTED_ORDER_DETAILS', payload: order.node })
   }

   return (
      <tr>
         <Td extraCSS={tableTdLink}>
            <A href={'/' + shopState.settings.customers.accountPageAccount + '/order'} onClick={onClick} css={cellLinkStyles}>
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
         <Td>{formatPriceToCurrency(order.node.totalPriceV2.amount, shopState.info.currencyCode)}</Td>
      </tr>
   )
}

export { Order }
