import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'
import to from 'await-to-js'
import { updateCustomerAddress, addCustomerAddress } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { Form } from '../../../../forms'
import { Input } from '../../../../forms/input'
import isEmpty from 'lodash/isEmpty'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressForm({ address, type }) {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   const [hasChanged, setHasChangedState] = useState(false)
   const [noticeState, setNoticeState] = useState(false)
   const [isSubmitting, setIsSubmitting] = useState(false)

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

      if (name === 'setDefault') {
         var newVal = event.target.checked
      } else {
         var newVal = event.target.value
      }

      newState[name] = newVal

      setFormState(newState)
   }

   useEffect(() => {
      // if (!address) {
      //    return
      // }

      setFormState({
         firstName: address && address.firstName ? address.firstName : '',
         lastName: address && address.lastName ? address.lastName : '',
         company: address && address.company ? address.company : '',
         address1: address && address.address1 ? address.address1 : '',
         address2: address && address.address2 ? address.address2 : '',
         zip: address && address.zip ? address.zip : '',
         phone: address && address.phone ? address.phone : '',
         province: address && address.province ? address.province : '',
         country: address && address.country ? address.country : '',
         city: address && address.city ? address.city : '',
         setDefault: false
      })
   }, [])

   function isDefaultAddress() {
      return customerState.defaultAddress.address1 === customerState.selectedAddress.address1
   }

   const cssWrapper = css`
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
   `

   const cssInput = css`
      && {
         width: auto;
         position: relative;
         top: 0.1em;
         margin-right: 0.6em;
      }
   `

   async function updateAddress() {
      setIsSubmitting(true)

      const [addressUpdateError, addressUpdateSuccess] = await to(
         updateCustomerAddress({
            address: formState,
            addressId: customerState.selectedAddress.id
         })
      )

      setIsSubmitting(false)

      if (addressUpdateSuccess.data.type === 'error') {
         setNoticeState({
            message: addressUpdateSuccess.data.message,
            type: addressUpdateSuccess.data.type
         })

         return
      }

      if (addressUpdateError) {
         console.error('UPDATE ADDRESS ERROR', addressUpdateError)
         return
      }

      if (isEmpty(addressUpdateSuccess.data)) {
         console.error('UPDATE ADDRESS ERROR :: NO ADDRESS FOUND', addressUpdateSuccess)
         return
      }

      customerDispatch({
         type: 'UPDATE_CUSTOMER_ADDRESS',
         payload: {
            oldAddressId: customerState.selectedAddress.id,
            newAddress: addressUpdateSuccess.data.updateAddress.customerAddressUpdate.customerAddress
         }
      })

      if (addressUpdateSuccess.data.updateDefaultAddress) {
         customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: addressUpdateSuccess.data.updateDefaultAddress.customerDefaultAddressUpdate.customer })
      }

      setNoticeState({
         message: 'Successfully updated address',
         type: 'success'
      })
   }

   async function addAddress() {
      const [addError, addSuccess] = await to(
         addCustomerAddress({
            address: formState
         })
      )

      if (addSuccess.data.type === 'error') {
         setNoticeState({
            message: addSuccess.data.message,
            type: addSuccess.data.type
         })

         return
      }

      if (addError) {
         console.error('ADD ADDRESS ERROR', addError)
         return
      }

      if (isEmpty(addSuccess.data)) {
         console.error('ADD ADDRESS ERROR :: NO ADDRESS FOUND', addSuccess)
         return
      }

      customerDispatch({
         type: 'ADD_CUSTOMER_ADDRESS',
         payload: addSuccess.data.addAddress.customerAddressCreate.customerAddress
      })

      if (addSuccess.data.addDefaultAddress) {
         customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: addSuccess.data.addDefaultAddress.customerDefaultAddressUpdate.customer })
      }

      setNoticeState({
         message: 'Successfully added address',
         type: 'success'
      })
   }

   function onSubmit(e) {
      e.preventDefault()

      if (type === 'edit') {
         updateAddress()
      }

      if (type === 'add') {
         addAddress()
      }
   }

   return (
      <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Update Address' hasChanged={hasChanged} formType='update-address' isSubmitting={isSubmitting}>
         <Input label='First Name:' type='text' name='first' placeholder='First Name' value={formState.firstName} onChange={e => onChange('firstName', e)} isSubmitting={isSubmitting} />

         <Input label='Last Name:' type='text' name='last' placeholder='Last Name' value={formState.lastName} onChange={e => onChange('lastName', e)} isSubmitting={isSubmitting} />

         <Input label='Company:' type='text' name='company' placeholder='Company Name' value={formState.company} onChange={e => onChange('company', e)} isSubmitting={isSubmitting} />

         <Input label='Address 1:' type='text' name='address1' placeholder='Address 1' value={formState.address1} onChange={e => onChange('address1', e)} isSubmitting={isSubmitting} />

         <Input label='Address 2:' type='text' name='address2' placeholder='Address 2' value={formState.address2} onChange={e => onChange('address2', e)} isSubmitting={isSubmitting} />

         <Input label='City:' type='text' name='city' placeholder='City' value={formState.city} onChange={e => onChange('city', e)} isSubmitting={isSubmitting} />

         <Input label='State/Province:' type='text' name='province' placeholder='State/Province' value={formState.province} onChange={e => onChange('province', e)} isSubmitting={isSubmitting} />

         <Input label='Country:' type='text' name='country' placeholder='Country' value={formState.country} onChange={e => onChange('country', e)} isSubmitting={isSubmitting} />

         <Input label='Postal/Zip:' type='text' name='zip' placeholder='Postal/Zip' value={formState.zip} onChange={e => onChange('zip', e)} isSubmitting={isSubmitting} />

         <Input label='Phone:' type='text' name='phone' placeholder='Phone' value={formState.phone} onChange={e => onChange('phone', e)} isSubmitting={isSubmitting} />

         {!isDefaultAddress() && (
            <Input
               label='Set as default address'
               type='checkbox'
               name='set-default'
               value={formState.setDefault}
               onChange={e => onChange('setDefault', e)}
               cssWrapper={cssWrapper}
               cssInput={cssInput}
               isSubmitting={isSubmitting}
            />
         )}
      </Form>
   )
}

export { AddressForm }
