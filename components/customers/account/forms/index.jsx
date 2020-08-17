import { CustomersContext } from '../../_state/context'
import { CustomerFormLogin } from './login'
import { CustomerFormRegister } from './register'
import { CustomerFormForgotPassword } from './forgot-password'
import { CustomerFormSetPassword } from './set-password'

const { useContext } = wp.element

function CustomersForms() {
  const [customerState] = useContext(CustomersContext)

  return !customerState.isAccountPage ? (
    <>
      <CustomerFormLogin />
      <CustomerFormRegister />
      <CustomerFormForgotPassword />
      <CustomerFormSetPassword />
    </>
  ) : null
}

export { CustomersForms }
