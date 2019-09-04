import React, { useContext } from 'react'
import { CustomersContext } from '../../_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { A } from 'hookrouter'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountReturn({ path = '', text, onInner }) {
   const [shopState] = useContext(ShopContext)
   const [customersState, customersDispatch] = useContext(CustomersContext)

   function onClick() {
      customersDispatch({ type: 'SET_INNER_PAGE', payload: onInner })
   }

   return (
      <A href={'/' + shopState.settings.customers.accountPageAccount + path} onClick={onClick}>
         {text}
      </A>
   )
}

export { AccountReturn }
