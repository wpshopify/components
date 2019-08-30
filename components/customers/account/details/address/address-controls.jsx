import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import uuidv4 from 'uuid/v4'
import { A } from 'hookrouter'
import { CustomersContext } from '../../../_state/context'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountAddressControls({ address }) {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   const stylesAddressLine = css`
      && {
         margin: 0;
      }
   `

   const stylesAddress = css`
      margin-bottom: 1em;
   `

   const stylesControl = css`
      padding: 0.5em;
   `

   const stylesControlWrapper = css`
      position: relative;
      left: -0.5em;
      margin-top: 0.8em;
   `

   function onEdit() {
      customerDispatch({ type: 'SET_SELECTED_ADDRESS', payload: address })
   }

   function onDelete() {
      console.log('onDelete')
   }

   return (
      !customerState.selectedAddress && (
         <div className='wps-account-address-controls' css={stylesControlWrapper}>
            <A href='/account/addresses/edit' onClick={onEdit} css={stylesControl}>
               Edit
            </A>
            <a href='#!' onClick={onDelete} css={stylesControl}>
               Delete
            </a>
         </div>
      )
   )
}

export { AccountAddressControls }
