import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { resetPasswordCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import { usePortal } from '../../../../common/hooks'
import { CustomersContext } from '../../_state/context'

function CustomerFormForgotPassword() {
   const [customersState, customersDispatch] = useContext(CustomersContext)
   const element = document.querySelector(customersState.dropzones.formForgotPassword)

   const [formState, setFormState] = useState({
      email: ''
   })

   const [noticeState, setNoticeState] = useState({
      message: '',
      type: ''
   })

   const [hasChanged, setHasChangedState] = useState(false)

   async function resetPassword() {
      const [resetError, resetSuccess] = await to(resetPasswordCustomer(formState))

      console.log('resetError', resetError)
      console.log('resetSuccess', resetSuccess)

      if (resetSuccess.data.type === 'error') {
         setNoticeState({
            message: resetSuccess.data.message,
            type: resetSuccess.data.type
         })

         setHasChangedState(true)

         return
      }

      if (!resetError) {
         setFormState({ email: '' })
      }
   }

   function onSubmit(e) {
      console.log('Form submitted with state: ', formState)
      e.preventDefault()

      resetPassword()
   }

   function onEmailChange(event) {
      setFormState({ ...formState, email: event.target.value })
      console.log('email', event.target.value)

      console.log('formState', formState)
   }

   function onPasswordChange(event) {
      setFormState({ ...formState, password: event.target.value })
      console.log('password', event.target.value)
      console.log('formState', formState)
   }

   return (
      element &&
      usePortal(
         <form id='wpshopify-component-customers-forgot-password' onSubmit={onSubmit} autoComplete='on'>
            {hasChanged && <Notice message={noticeState.message} type={noticeState.type} />}

            <div className='wpshopify-input-wrapper'>
               <label htmlFor='wpshopify-input-email'>Email or username:</label>
               <input required type='email' placeholder='Email or username' onChange={onEmailChange} className='wpshopify-input wpshopify-input-email' value={formState.email} />
            </div>

            <div className='wpshopify-buttons-wrapper'>
               <button type='submit' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
                  Reset password
               </button>
            </div>

            <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
         </form>,
         element
      )
   )
}

export { CustomerFormForgotPassword }
