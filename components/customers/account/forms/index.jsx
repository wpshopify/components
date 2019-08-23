import React from 'react'
import ReactDOM from 'react-dom'
import { CustomerFormLogin } from './login'
import { CustomerFormRegister } from './register'
import { CustomerFormForgotPassword } from './forgot-password'
import { CustomerFormSetPassword } from './set-password'

function CustomersForms() {
   return (
      <>
         <CustomerFormLogin />
         <CustomerFormRegister />
         <CustomerFormForgotPassword />
         <CustomerFormSetPassword />
      </>
   )
}

export { CustomersForms }
