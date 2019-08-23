import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { loginCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'

function CustomerFormLogin() {
   const [customersState, customersDispatch] = useContext(CustomersContext)

   const element = document.querySelector(customersState.dropzones.formLogin)

   const emailRef = useRef()

   const [formState, setFormState] = useState({
      email: '',
      password: ''
   })

   const [noticeState, setNoticeState] = useState({
      message: '',
      type: ''
   })

   const [hasChanged, setHasChangedState] = useState(false)

   async function login() {
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

         emailRef.current.focus()

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
         <form id='wpshopify-component-customers-login' onSubmit={onSubmit}>
            {hasChanged && <Notice message={noticeState.message} type={noticeState.type} />}

            <div className='wpshopify-input-wrapper'>
               <label htmlFor='wpshopify-input-email'>Email or username:</label>
               <input required type='email' placeholder='Email or username' value={formState.email} onChange={onEmailChange} className='wpshopify-input wpshopify-input-email' ref={emailRef} />
            </div>

            <div className='wpshopify-input-wrapper'>
               <label htmlFor='wpshopify-input-password'>Password:</label>
               <input
                  required
                  type='password'
                  placeholder='Password'
                  value={formState.password}
                  onChange={onPasswordChange}
                  className='wpshopify-input wpshopify-input-password'
                  id='wpshopify-input-password'
               />
            </div>

            <div className='wpshopify-buttons-wrapper'>
               <button type='submit' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
                  Login
               </button>

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

            <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
         </form>,
         element
      )
   )
}

export { CustomerFormLogin }
