import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { setPasswordCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import { CustomersContext } from '../../_state/context'
import { Form } from '../../../forms'
import { Input } from '../../../forms/input'

function ResetForm({ noticeState, formState, onPasswordChange, onConfirmPasswordChange, onSubmit, customersState }) {
   const element = document.querySelector(customersState.dropzones.formSetPassword)

   return (
      element &&
      usePortal(
         <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Set new password' formType="reset-password">

            <Input label='New Password:' type='password' name='password' isRequired={true} value={formState.password} onChange={onPasswordChange} />

            <Input label='Confirm New Password:' type='password' name='confirm-password' isRequired={true} value={formState.confirmPassword} onChange={onConfirmPasswordChange} />

         </Form>,
         element
      )
   )
}

function LoginLink({ noticeState }) {
   return (
      <>
         <Notice message={noticeState.message} type={noticeState.type} />
         <a href='/login' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
            Login
         </a>
      </>
   )
}

function CustomerFormSetPassword() {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   const [formState, setFormState] = useState({
      password: '',
      confirmPassword: '',
      customerId: '',
      resetToken: ''
   })

   const [noticeState, setNoticeState] = useState(false)

   const [hasChanged, setHasChangedState] = useState(false)

   useEffect(() => {
      var urlParams = new URLSearchParams(window.location.search)

      if (!window.location.search || !urlParams.get('token')) {
         setFormState({
            password: '',
            confirmPassword: '',
            customerId: '',
            resetToken: ''
         })

         setNoticeState({
            message: 'No token found',
            type: 'error'
         })
      } else {
         var token = urlParams.get('token')
         var [customerId, resetToken] = token.split('/')
         var encodedCustomerId = btoa('gid://shopify/Customer/' + customerId)

         setFormState({ ...formState, customerId: encodedCustomerId, resetToken: resetToken })
      }
   }, [])

   async function resetPassword() {
      console.log('formState', formState)

      const [resetError, resetSuccess] = await to(setPasswordCustomer(formState))

      console.log('resetError', resetError)
      console.log('resetSuccess', resetSuccess)

      if (!resetSuccess && resetError) {
         setNoticeState({ message: 'Error: ' + resetError.message + '. Error code: ' + resetError.statusCode, type: 'error' })

         setFormState({
            password: '',
            confirmPassword: '',
            customerId: '',
            resetToken: ''
         })

         return
      }

      // console.log('resetSuccess', resetSuccess.data.customerReset.customerUserErrors)
      // customerReset.customer.displayName

      if (resetSuccess.data.type === 'error') {
         setNoticeState({ message: 'Error: ' + resetSuccess.data.message, type: 'error' })

         setFormState({
            password: '',
            confirmPassword: '',
            customerId: '',
            resetToken: ''
         })

         return
      }

      if (!isEmpty(resetSuccess.data.customerReset.customerUserErrors)) {
         var errorObj = resetSuccess.data.customerReset.customerUserErrors[0]
         setNoticeState({ message: 'Error: ' + errorObj.message + '. Error code: ' + errorObj.code, type: 'error' })

         setFormState({
            password: '',
            confirmPassword: '',
            customerId: '',
            resetToken: ''
         })
      } else {
         if (!resetError) {
            setFormState({
               password: '',
               confirmPassword: '',
               customerId: '',
               resetToken: ''
            })

            setNoticeState({ message: 'Success! Your password has been changed. <a href="/login">Login to your account.</a>', type: 'success' })
            setHasChangedState(true)
         } else {
            setNoticeState({ message: 'Error: Something something', type: 'error' })
         }
      }
   }

   function onSubmit(e) {
      e.preventDefault()

      resetPassword()
   }

   function onPasswordChange(event) {
      console.log('event.target.value ', event.target.value)
      setFormState({ ...formState, password: event.target.value })
   }

   function onConfirmPasswordChange(event) {
      console.log('event.target.value ', event.target.value)
      setFormState({ ...formState, confirmPassword: event.target.value })
   }

   return hasChanged ? (
      <LoginLink noticeState={noticeState} />
   ) : (
      <ResetForm
         onSubmit={onSubmit}
         formState={formState}
         noticeState={noticeState}
         onPasswordChange={onPasswordChange}
         onConfirmPasswordChange={onConfirmPasswordChange}
         customersState={customersState}
      />
   )
}

export { CustomerFormSetPassword }
