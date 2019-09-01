import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { A } from 'hookrouter'
import { CustomersContext } from '../../../_state/context'
import { AddressesContext } from '../../addresses/_state/context'
import { deleteCustomerAddress } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountAddressControls({ address }) {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   const [addressesState, addressesDispatch] = useContext(AddressesContext)

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

   async function deleteAddress() {
      const [error, success] = await to(
         deleteCustomerAddress({
            addressId: address.id
         })
      )

      if (success.data.type === 'error') {
         setNoticeState({
            message: success.data.message,
            type: success.data.type
         })

         return
      }

      console.log('error', error)
      console.log('success', success)
      console.log('address', address)

      addressesDispatch({
         type: 'SET_NOTICES',
         payload: {
            message: 'Successfully deleted address',
            type: 'success'
         }
      })

      customerDispatch({ type: 'DELETE_CUSTOMER_ADDRESS', payload: address.id })
   }

   function onDelete() {
      if (window.confirm('Do you really want to delete this address?')) {
         deleteAddress()
      }
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
