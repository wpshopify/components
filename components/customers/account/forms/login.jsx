import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { loginCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import { Form } from '../../../forms'
import { Input } from '../../../forms/input'

function CustomerFormLogin() {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   const element = document.querySelector(customersState.dropzones.formLogin)

   const emailRef = useRef()

   const [formState, setFormState] = useState({
      email: '',
      password: ''
   })

   const [noticeState, setNoticeState] = useState(false)

   const [hasChanged, setHasChangedState] = useState(false)

   async function login() {
      console.log('formState', formState)

      const [loginError, loginSuccess] = await to(loginCustomer(formState))

      console.log('loginError', loginError)
      console.log('loginSuccess', loginSuccess)

      if (loginSuccess.data.type === 'error') {
         setNoticeState({
            message: loginSuccess.data.message,
            type: loginSuccess.data.type
         })

         setHasChangedState(true)

         setFormState({
            email: '',
            password: ''
         })

         // emailRef.current.focus()

         return
      }

      if (loginError) {
         console.log('LOGIN ERROR', loginError)
         return
      }

      if (isEmpty(loginSuccess.data)) {
         console.log('LOGIN ERROR :: NO CUSTOMER FOUND', loginSuccess)
         return
      }

      window.location.replace('/account')
   }

   function onSubmit(e) {
      console.log('Form submitted with state: ', formState)
      e.preventDefault()

      login()
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
         <Form dropzoneElement={element} onSubmit={onSubmit} noticeState={noticeState} submitText='Login' hasChanged={hasChanged} afterSubmitButton={LoginActions} formType='login'>
            <Input label='Email or username:' type='email' name='email' isRequired={true} placeholder='Email or username' value={formState.email} onChange={onEmailChange} />

            <Input label='Password:' type='password' name='password' isRequired={true} placeholder='Password' value={formState.password} onChange={onPasswordChange} />
         </Form>,
         element
      )
   )
}

function LoginActions() {
   return (
      <div className='wpshopify-buttons-wrapper'>
         <p className='wpshopify-login-create'>
            <span>Need an account? </span>
            <a href='/register' className='wpshopify-login-secondary-link'>
               Join now
            </a>
         </p>

         <p className='wpshopify-login-forgot'>
            <a href='/forgot-password' className='wpshopify-login-secondary-link'>
               Forgot password?
            </a>
         </p>
      </div>
   )
}

export { CustomerFormLogin }
