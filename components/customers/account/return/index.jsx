import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { CustomersContext } from '../../_state/context'
import isEmpty from 'lodash/isEmpty'
import { A } from 'hookrouter'
import { stylesSlideIn } from '../../_styles'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountReturn({ path, text, onInner }) {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   function onClick() {
      customersDispatch({ type: 'SET_INNER_PAGE', payload: onInner })
   }

   return (
      <A href={path} onClick={onClick}>
         {text}
      </A>
   )
}

export { AccountReturn }
