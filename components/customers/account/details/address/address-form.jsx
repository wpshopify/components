import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'
import to from 'await-to-js'
import { updateCustomerAddress } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { Form } from '../../../../forms'
import { Input } from '../../../../forms/input'
import isEmpty from 'lodash/isEmpty'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressForm({ address }) {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   const [hasChanged, setHasChangedState] = useState(false)

   const [noticeState, setNoticeState] = useState({
      message: '',
      type: ''
   })

   const [formState, setFormState] = useState({
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      zip: '',
      phone: '',
      province: '',
      country: '',
      city: '',
      setDefault: false
   })

   function onChange(name, event) {
      var newState = {
         ...formState
      }

      newState[name] = event.target.value

      setFormState(newState)
   }

   useEffect(() => {
      if (!address) {
         return
      }

      setFormState({
         firstName: address.firstName || '',
         lastName: address.lastName || '',
         company: address.company || '',
         address1: address.address1 || '',
         address2: address.address2 || '',
         zip: address.zip || '',
         phone: address.phone || '',
         province: address.province || '',
         country: address.country || '',
         city: address.city || '',
         setDefault: false
      })
   }, [])

   function isDefaultAddress() {
      return customerState.defaultAddress.address1 === customerState.selectedAddress.address1
   }

   const stylesSetDefault = css`
      display: flex;
   `

   const stylesSetDefaultInput = css`
      && {
         width: auto;
         position: relative;
         top: 0.1em;
         margin-right: 0.6em;
      }
   `

   async function updateAddress() {
      console.log('formState', formState)
      console.log('customerState')

      const [addressUpdateError, addressUpdateSuccess] = await to(
         updateCustomerAddress({
            address: formState,
            addressId: customerState.selectedAddress.id
         })
      )

      console.log('addressUpdateError', addressUpdateError)
      console.log('addressUpdateSuccess', addressUpdateSuccess)
      setHasChangedState(true)

      if (addressUpdateSuccess.data.type === 'error') {
         setNoticeState({
            message: addressUpdateSuccess.data.message,
            type: addressUpdateSuccess.data.type
         })

         // emailRef.current.focus()

         return
      }

      if (addressUpdateError) {
         console.log('UPDATE ADDRESS ERROR', addressUpdateError)
         return
      }

      if (isEmpty(addressUpdateSuccess.data)) {
         console.log('UPDATE ADDRESS ERROR :: NO ADDRESS FOUND', addressUpdateSuccess)
         return
      }

      console.log('UPDATE ADDRESS SUCCESS! :: ', addressUpdateSuccess.data.customerAddressUpdate)
      setNoticeState({
         message: 'Successfully updated address',
         type: 'success'
      })
   }

   function onSubmit(e) {
      e.preventDefault()

      updateAddress()
   }

   return (
      <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Update Address' hasChanged={hasChanged} formType='update-address'>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-email'>First Name:</label>
            <input
               type='text'
               id='wpshopify-input-email'
               placeholder='First Name'
               onChange={e => onChange('firstName', e)}
               className='wpshopify-input wpshopify-input-first'
               value={formState.firstName}
            />
         </div>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-last'>Last Name:</label>
            <input type='text' id='wpshopify-input-last' placeholder='Last Name' onChange={e => onChange('lastName', e)} className='wpshopify-input wpshopify-input-last' value={formState.lastName} />
         </div>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-company'>Company:</label>
            <input
               type='text'
               placeholder='Company name'
               id='wpshopify-input-company'
               onChange={e => onChange('company', e)}
               className='wpshopify-input wpshopify-input-company'
               value={formState.company}
            />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-address1'>Address 1:</label>
            <input
               type='text'
               placeholder='Address 1'
               id='wpshopify-input-address1'
               onChange={e => onChange('address1', e)}
               className='wpshopify-input wpshopify-input-address1'
               value={formState.address1}
            />
         </div>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-address2'>Address 2:</label>
            <input
               type='text'
               placeholder='Address 2'
               id='wpshopify-input-address2'
               onChange={e => onChange('address2', e)}
               className='wpshopify-input wpshopify-input-address2'
               value={formState.address2}
            />
         </div>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-city'>City:</label>
            <input required type='text' placeholder='Address 2' id='wpshopify-input-city' onChange={e => onChange('city', e)} className='wpshopify-input wpshopify-input-city' value={formState.city} />
         </div>
         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-country'>Country:</label>
            <input
               type='text'
               placeholder='Country'
               id='wpshopify-input-country'
               onChange={e => onChange('country', e)}
               className='wpshopify-input wpshopify-input-country'
               value={formState.country}
            />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-province'>State / Province:</label>
            <input
               type='text'
               placeholder='Province'
               id='wpshopify-input-province'
               onChange={e => onChange('province', e)}
               className='wpshopify-input wpshopify-input-province'
               value={formState.province}
            />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-postal'>Postal/Zip Code:</label>
            <input type='text' placeholder='Postal' id='wpshopify-input-postal' onChange={e => onChange('zip', e)} className='wpshopify-input wpshopify-input-postal' value={formState.postal} />
         </div>

         <div className='wpshopify-input-wrapper'>
            <label htmlFor='wpshopify-input-phone'>Phone:</label>
            <input required type='text' placeholder='Phone' id='wpshopify-input-phone' onChange={e => onChange('phone', e)} className='wpshopify-input wpshopify-input-phone' value={formState.phone} />
         </div>

         {!isDefaultAddress() && (
            <div className='wpshopify-input-wrapper' css={stylesSetDefault}>
               <input
                  type='checkbox'
                  id='wpshopify-input-set-default'
                  css={stylesSetDefaultInput}
                  onChange={e => onChange('setDefault', e)}
                  className='wpshopify-input wpshopify-input-set-default'
                  value={formState.setDefault}
               />
               <label htmlFor='wpshopify-input-set-default'>Set as default address</label>
            </div>
         )}
      </Form>
   )
}

export { AddressForm }
