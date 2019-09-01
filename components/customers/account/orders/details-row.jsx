import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function OrderDetailsRow({ lineItem }) {
   console.log('lineItem', lineItem)

   return (
      <tr>
         <td>{lineItem.title + '-' + lineItem.variant.title}</td>
         <td>{lineItem.variant.sku}</td>
         <td>{lineItem.variant.priceV2.amount}</td>
         <td>{lineItem.quantity}</td>
         <td>{lineItem.variant.priceV2.amount}</td>
      </tr>
   )
}

export { OrderDetailsRow }
