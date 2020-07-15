/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { renderToString } from 'react-dom/server'
import { Loader } from '../loader'

const { Notice } = wp.components

function Form({
  children,
  onSubmit,
  noticeState,
  submitText,
  hasChanged,
  beforeSubmitButton,
  afterSubmitButton,
  formType,
  isSubmitting,
}) {
  const inputCSS = css`
    &:disabled:hover {
      cursor: not-allowed;
    }
  `
  return (
    <form
      id={`wpshopify-component-customers-${formType}`}
      className='wpshopify-account-form'
      onSubmit={onSubmit}>
      {noticeState && (
        <Notice status={noticeState.type} isDismissible={false}>
          {noticeState.message}
        </Notice>
      )}

      {children}

      {beforeSubmitButton && (
        <div dangerouslySetInnerHTML={{ __html: renderToString(beforeSubmitButton()) }} />
      )}

      <button
        disabled={isSubmitting}
        type='submit'
        className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
        {isSubmitting ? <Loader isLoading={isSubmitting} /> : submitText}
      </button>

      {afterSubmitButton && (
        <div dangerouslySetInnerHTML={{ __html: renderToString(afterSubmitButton()) }} />
      )}

      <input type='hidden' className='wpshopify-input wpshopify-input-nonce' css={inputCSS} />
    </form>
  )
}

export { Form }
