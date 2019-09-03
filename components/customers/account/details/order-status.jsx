import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function OrderStatus({ order, extraCSS }) {
   return (
      <a href={order.statusUrl} target='_blank' css={extraCSS}>
         Check status
      </a>
   )
}

export { OrderStatus }
