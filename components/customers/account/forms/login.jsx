import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import { CustomersContext } from '../../_state/context'
import { loginCustomer } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api'
import { usePortal } from '../../../../common/hooks'
import { Form } from '../../../forms'
import { Input } from '../../../forms/input'

const { useState, useRef, useContext } = wp.element

function CustomerFormLogin() {
  const [customersState, customersDispatch] = useContext(CustomersContext)
  const [isSubmitting, setIsSubmitting] = useState(() => false)

  const element = document.querySelector(customersState.dropzones.formLogin)

  const emailRef = useRef()

  const [formState, setFormState] = useState(() => {
    return {
      email: '',
      password: '',
    }
  })

  const [noticeState, setNoticeState] = useState(() => false)

  const [hasChanged, setHasChangedState] = useState(() => false)

  async function login() {
    setIsSubmitting(true)

    const [loginError, loginSuccess] = await to(loginCustomer(formState))

    if (loginSuccess.data.type === 'error') {
      setIsSubmitting(false)

      setNoticeState({
        message: loginSuccess.data.message,
        type: loginSuccess.data.type,
      })

      setHasChangedState(true)

      setFormState({
        email: '',
        password: '',
      })

      // emailRef.current.focus()

      return
    }

    if (loginError) {
      setIsSubmitting(false)

      console.error('WP Shopify error: ', loginError)
      return
    }

    if (isEmpty(loginSuccess.data)) {
      return
    }

    window.location.replace('/' + wpshopify.settings.general.accountPageAccount)
  }

  function onSubmit(e) {
    e.preventDefault()

    login()
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
      <Form
        dropzoneElement={element}
        onSubmit={onSubmit}
        noticeState={noticeState}
        submitText='Login'
        hasChanged={hasChanged}
        afterSubmitButton={LoginActions}
        formType='login'
        isSubmitting={isSubmitting}>
        <Input
          label='Email or username:'
          type='email'
          name='email'
          isRequired={true}
          placeholder='Email or username'
          value={formState.email}
          onChange={onEmailChange}
          isSubmitting={isSubmitting}
        />

        <Input
          label='Password:'
          type='password'
          name='password'
          isRequired={true}
          placeholder='Password'
          value={formState.password}
          onChange={onPasswordChange}
          isSubmitting={isSubmitting}
        />
      </Form>,
      element
    )
  )
}

function LoginActions() {
  return (
    <div className='wpshopify-buttons-wrapper'>
      <div>
        <strong>Username:</strong> yame@rev-mail.net <strong>Password:</strong> qp05ofilterZ!@
      </div>
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
