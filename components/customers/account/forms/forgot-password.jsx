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
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [formState, setFormState] = useState({
      email: ''
   })
   
   const [noticeState, setNoticeState] = useState(false)

   const [hasChanged, setHasChangedState] = useState(false)

   async function resetPassword() {
      setIsSubmitting(true)
      
      const [resetError, resetSuccess] = await to(resetPasswordCustomer(formState))

      setIsSubmitting(false)

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
      e.preventDefault()

      resetPassword()
   }

   function onEmailChange(event) {
      setFormState({ ...formState, email: event.target.value })
   }

   function onPasswordChange(event) {
      setFormState({ ...formState, password: event.target.value })
   }

   return (
      element &&
      usePortal(
         <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Reset Password' formType='forgot-password' isSubmitting={isSubmitting}>
            <Input label='Email or username:' type='email' name='email' isRequired={true} placeholder='Email or username' value={formState.email} onChange={onEmailChange} isSubmitting={isSubmitting} />
         </Form>,
         element
      )
   )
}

export { CustomerFormForgotPassword }
