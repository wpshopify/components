import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { prettyDate } from '../../../../common/utils'
import { CustomersContext } from '../../_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { AccountReturn } from '../return'
import { stylesSlideIn } from '../../_styles'
import { OrderDetailsRow } from './details-row'
import uuidv4 from 'uuid/v4'

import { Table } from '../../../tables'
import { TableHeader } from '../../../tables/header'
import { Th } from '../../../tables/header/th'
import { TableFooter } from '../../../tables/footer'
import { TableBody } from '../../../tables/body'
import { Td } from '../../../tables/body/td'
import { AccountDetailsAddress } from '../details/address/address'
import { FulfillmentStatus } from '../details/fulfillment-status'
import { OrderStatus } from '../details/order-status'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function OrderDetails() {
   const [shopState] = useContext(ShopContext)

   var stylesLeft = css`
      border-left: 0;
   `

   var stylesRight = css`
      border-right: 0;
   `

   var row = css`
      display: flex;
      justify-content: space-between;
   `

   var shippingAddressStyles = css`
      width: 32%;
   `

   var tableStyles = css`
      width: 65%;
   `

   const [customersState, customersDispatch] = useContext(CustomersContext)

   return (
      <section css={stylesSlideIn}>
         <AccountReturn text='Return to Account Details' onInner={false} />

         <div css={row}>
            <div css={tableStyles}>
               <h2>Order {customersState.selectedOrderDetails.name}</h2>
               <p>
                  <b>Placed on:</b> {prettyDate(customersState.selectedOrderDetails.processedAt, "MMMM dd, yyyy 'at' h:mm aaaa")}
               </p>
               <p>
                  <b>
                     Order status: <OrderStatus order={customersState.selectedOrderDetails} />
                  </b>
               </p>
               <p>
                  <b>Fulfillment status:</b> <FulfillmentStatus order={customersState.selectedOrderDetails} />
               </p>
               <Table>
                  <TableHeader>
                     <Th>Product</Th>
                     <Th>SKU</Th>
                     <Th align='right'>Price</Th>
                     <Th align='right'>Quantity</Th>
                     <Th align='right'>Total</Th>
                  </TableHeader>
                  <TableBody>
                     {customersState.selectedOrderDetails.lineItems.edges.map(lineItem => (
                        <OrderDetailsRow key={uuidv4()} lineItem={lineItem.node} />
                     ))}
                  </TableBody>
                  <TableFooter>
                     <tr>
                        <Th align='right' colspan={4} extraCSS={stylesRight}>
                           Subtotal
                        </Th>
                        <Td align='right' extraCSS={stylesLeft} colspan={4}>
                           {formatPriceToCurrency(customersState.selectedOrderDetails.subtotalPriceV2.amount, shopState.info.currencyCode)}
                        </Td>
                     </tr>
                     <tr>
                        <Th align='right' colspan={4} extraCSS={stylesRight}>
                           <strong>Total</strong>
                        </Th>
                        <Td align='right' extraCSS={stylesLeft} colspan={4}>
                           <strong>{formatPriceToCurrency(customersState.selectedOrderDetails.totalPriceV2.amount, shopState.info.currencyCode)}</strong>
                        </Td>
                     </tr>
                  </TableFooter>
               </Table>
            </div>

            <div css={shippingAddressStyles}>
               <h2>Shipping Address</h2>
               <AccountDetailsAddress address={customersState.selectedOrderDetails.shippingAddress} />
            </div>
         </div>
      </section>
   )
}

export { OrderDetails }
