import { registerCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import to from 'await-to-js';
import isEmpty from 'lodash/isEmpty';
import { usePortal } from '../../../../common/hooks';
import { CustomersContext } from '../../_state/context';
import { Form } from '../../../forms';
import { Input } from '../../../forms/input';
import { Notice } from '../../notices';

const { useContext, useRef, useState } = wp.element;

function CustomerFormRegister() {
  const [customersState] = useContext(CustomersContext);
  const [isSubmitting, setIsSubmitting] = useState(() => false);
  const emailRef = useRef();

  const [formState, setFormState] = useState(() => {
    return {
      email: '',
      username: '',
      password: '',
    };
  });

  const [noticeState, setNoticeState] = useState(() => false);

  const [hasChanged, setHasChangedState] = useState(() => false);

  async function register() {
    setIsSubmitting(true);

    const [registerError, registerSuccess] = await to(registerCustomer(formState));

    setIsSubmitting(false);

    if (registerSuccess.data.type === 'error') {
      setNoticeState({
        message: registerSuccess.data.message,
        type: registerSuccess.data.type,
      });

      setFormState({ username: '', email: '', password: '' });

      // emailRef.current.focus()

      return;
    }

    if (registerError) {
      console.error('WP Shopify error: ', registerError);
      return;
    }

    if (isEmpty(registerSuccess.data)) {
      return;
    }

    setNoticeState({
      message:
        'Successfully created account! <a href="/' +
        wpshopify.settings.general.accountPageLogin +
        '">Login</a>.',
      type: 'success',
    });

    setHasChangedState(true);

    setFormState({ username: '', email: '', password: '' });
  }

  function onSubmit(e) {
    e.preventDefault();

    register();
  }

  function onEmailChange(event) {
    setFormState({ ...formState, email: event.target.value });
  }

  function onUsernameChange(event) {
    setFormState({ ...formState, username: event.target.value });
  }

  function onPasswordChange(event) {
    setFormState({ ...formState, password: event.target.value });
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
      isSubmitting={isSubmitting}
    />
  );
}

function LoginLink({ noticeState }) {
  return (
    <>
      <Notice status={noticeState.type} isDismissible={false}>
        {noticeState.message}
      </Notice>

      <a
        href={'/' + wpshopify.settings.general.accountPageLogin}
        className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
        Login to your account
      </a>
    </>
  );
}

function RegisterForm({
  onSubmit,
  noticeState,
  formState,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  emailRef,
  hasChanged,
  customersState,
  isSubmitting,
}) {
  const element = document.querySelector(customersState.dropzones.formRegister);

  return (
    element &&
    usePortal(
      <Form
        onSubmit={onSubmit}
        noticeState={noticeState}
        submitText='Create your account'
        formType='register'
        isSubmitting={isSubmitting}>
        <Input
          label='Email:'
          type='email'
          name='email'
          isRequired={true}
          placeholder='Email'
          value={formState.email}
          onChange={onEmailChange}
          isSubmitting={isSubmitting}
        />

        <Input
          label='Username (optional):'
          type='text'
          name='username'
          placeholder='Username'
          value={formState.username}
          onChange={onUsernameChange}
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
  );
}

export { CustomerFormRegister };
