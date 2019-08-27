import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { CustomersContext } from '../../_state/context'
import { AccountReturn } from '../return'
import isEmpty from 'lodash/isEmpty'
import { A } from 'hookrouter'
import { stylesSlideIn } from '../../_styles'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function OrderDetails() {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   return (
      <section css={stylesSlideIn}>
         <AccountReturn path="/account/" text="Return to Account Details" onInner={false} />

         <h2>{customersState.selectedOrderDetails.name}</h2>
      </section>
   )
}

export { OrderDetails }
