import React, { useState, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { registerCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import { CustomersContext } from '../../_state/context'
import { Form } from '../../../forms'
import { Input } from '../../../forms/input'

function CustomerFormRegister() {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   const emailRef = useRef()

   const [formState, setFormState] = useState({
      email: '',
      username: '',
      password: ''
   })

   const [noticeState, setNoticeState] = useState(false)

   const [hasChanged, setHasChangedState] = useState(false)

   async function register() {
      const [registerError, registerSuccess] = await to(registerCustomer(formState))

      console.log('registerError', registerError)
      console.log('registerSuccess', registerSuccess)

      if (registerSuccess.data.type === 'error') {
         setNoticeState({
            message: registerSuccess.data.message,
            type: registerSuccess.data.type
         })

         setFormState({ username: '', email: '', password: '' })

         emailRef.current.focus()

         return
      }

      if (registerError) {
         console.log('LOGIN ERROR', registerError)
         return
      }

      if (isEmpty(registerSuccess.data)) {
         console.log('LOGIN ERROR :: NO CUSTOMER FOUND', registerSuccess)
         return
      }

      setHasChangedState(true)
      setFormState({ username: '', email: '', password: '' })
      setNoticeState({
         message: 'Your account has been created! Login.',
         type: 'success'
      })
   }

   function onSubmit(e) {
      console.log('Form submitted with state: ', formState)
      e.preventDefault()

      register()
   }

   function onEmailChange(event) {
      setFormState({ ...formState, email: event.target.value })
      console.log('email', event.target.value)

      console.log('formState', formState)
   }

   function onUsernameChange(event) {
      setFormState({ ...formState, username: event.target.value })
      console.log('username', event.target.value)

      console.log('formState', formState)
   }

   function onPasswordChange(event) {
      setFormState({ ...formState, password: event.target.value })
      console.log('password', event.target.value)
      console.log('formState', formState)
   }

   return hasChanged ? (
      <LoginLink noticeState={noticeState} />
   ) : (
      <RegisterForm
         onSubmit={onSubmit}
         formState={formState}
         noticeState={noticeState}
         onPasswordChange={onPasswordChange}
         onEmailChange={onEmailChange}
         onUsernameChange={onUsernameChange}
         emailRef={emailRef}
         hasChanged={hasChanged}
         customersState={customersState}
      />
   )
}

function LoginLink({ noticeState }) {
   return (
      <>
         <Notice message={noticeState.message} type={noticeState.type} />
         <a href='/account' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
            Login to your account
         </a>
      </>
   )
}

function RegisterForm({ onSubmit, noticeState, formState, onEmailChange, onUsernameChange, onPasswordChange, emailRef, hasChanged, customersState }) {
   const element = document.querySelector(customersState.dropzones.formRegister)

   return (
      element &&
      usePortal(
         <Form onSubmit={onSubmit} noticeState={noticeState} submitText='Create your account' formType="register">

            <Input label='Email:' type='email' name='email' isRequired={true} placeholder='Email' value={formState.email} onChange={onEmailChange} />

            <Input label='Username (optional):' type='text' name='username' placeholder='Username' value={formState.username} onChange={onUsernameChange} />

            <Input label='Password:' type='password' name='password' isRequired={true} placeholder='Password' value={formState.password} onChange={onPasswordChange} />

         </Form>,
         element
      )
   )
}

export { CustomerFormRegister }
