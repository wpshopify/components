import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { resetPasswordCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import { usePortal } from '../../../../common/hooks'
import { CustomersContext } from '../../_state/context'
import { Form } from '../../../forms'
import { Input } from '../../../forms/input'

function CustomerFormForgotPassword() {
   const [customersState, customersDispatch] = useContext(CustomersContext)
   const element = document.querySelector(customersState.dropzones.formForgotPassword)

   const [formState, setFormState] = useState({
      email: ''
   })

   const [noticeState, setNoticeState] = useState(false)

   const [hasChanged, setHasChangedState] = useState(false)

   async function resetPassword() {
      const [resetError, resetSuccess] = await to(resetPasswordCustomer(formState))

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
         <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Reset Password' formType="forgot-password">

            <Input label='Email or username:' type='email' name='email' isRequired={true} placeholder='Email or username' value={formState.email} onChange={onEmailChange} />

         </Form>,
         element
      )
   )
}

export { CustomerFormForgotPassword }
