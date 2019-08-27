import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressForm() {

   const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      company: ''
   })

   function onFirstNameChange() {
      setFormState({ ...formState, firstName: event.target.value })
   }

   function onLastNameChange() {
      setFormState({ ...formState, lastName: event.target.value })
   }

   function onCompanyChange() {
      setFormState({ ...formState, company: event.target.value })
   }

   return (
      <form id='wpshopify-component-address-edit' autoComplete='on'>
         {/* {hasChanged && <Notice message={noticeState.message} type={noticeState.type} />} */}

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-email'>First Name:</label>
            <input required type='text' id="wpshopify-input-email" placeholder='First Name' onChange={onFirstNameChange} className='wpshopify-input wpshopify-input-first' value={formState.firstName} />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-last'>Last Name:</label>
            <input required type='text' id="wpshopify-input-last" placeholder='Last Name' onChange={onLastNameChange} className='wpshopify-input wpshopify-input-last' value={formState.lastName} />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-company'>Company:</label>
            <input required type='text' placeholder='Company name' id="wpshopify-input-company" onChange={onCompanyChange} className='wpshopify-input wpshopify-input-company' value={formState.company} />
         </div>

         <div className='wpshopify-buttons-wrapper'>
            <button type='submit' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
               Update Address
            </button>
         </div>

         <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
      </form>
   )
}

export { AddressForm }
