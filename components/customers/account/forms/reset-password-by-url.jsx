import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { resetPasswordByUrlCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function CustomersResetPasswordByUrl() {
   const [formState, setFormState] = useState({
      password: ''
   })

   async function resetPassword() {
      const [resetError, resetSuccess] = await to(resetPasswordByUrlCustomer(formState))

      console.log('resetError', resetError)
      console.log('resetSuccess', resetSuccess)

      if (!resetError) {
         setFormState({ password: '' })
      }
   }

   function onSubmit(e) {
      console.log('Form submitted with state: ', formState)
      e.preventDefault()

      resetPassword()
   }

   function onPasswordChange(event) {
      setFormState({ ...formState, password: event.target.value })
   }

   return (
      <form id='wpshopify-component-customers-forgot-password' onSubmit={onSubmit}>
         <div className='wpshopify-input-wrapper'>

            <label htmlFor='wpshopify-input-email'>Password:</label>
            <input type='password' placeholder='Password' onChange={onPasswordChange} className='wpshopify-input wpshopify-input-email' value={formState.password} />            
         </div>

         <button type='submit'>Reset password</button>
         <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
      </form>
   )
}

function RenderCustomersResetPasswordByUrl() {
   var element = document.querySelector('#component-customers-reset-password-by-url')

   if (element) {
      ReactDOM.render(<CustomersResetPasswordByUrl />, element)
   }
}

export { RenderCustomersResetPasswordByUrl }
