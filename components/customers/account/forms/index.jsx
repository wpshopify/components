import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { CustomerFormLogin } from './login'
import { CustomerFormRegister } from './register'
import { CustomerFormForgotPassword } from './forgot-password'
import { CustomerFormSetPassword } from './set-password'

function CustomersForms() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   return (
      !customerState.isAccountPage && (
         <>
            <CustomerFormLogin />
            <CustomerFormRegister />
            <CustomerFormForgotPassword />
            <CustomerFormSetPassword />
         </>
      )
   )
}

export { CustomersForms }
