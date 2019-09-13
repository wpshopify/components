import React from 'react'
import ReactDOM from 'react-dom'
import { Notice } from '../notice'
import { renderToString } from 'react-dom/server'
import { Loader } from '../loader'

function Form({ children, onSubmit, noticeState, submitText, hasChanged, beforeSubmitButton, afterSubmitButton, formType, isSubmitting }) {
   return (
      <form id={`wpshopify-component-customers-${formType}`} className='wpshopify-account-form' onSubmit={onSubmit}>
         {noticeState && <Notice message={noticeState.message} type={noticeState.type} />}

         {children}

         {beforeSubmitButton && <div dangerouslySetInnerHTML={{ __html: renderToString(beforeSubmitButton()) }} />}

         <button disabled={isSubmitting} type='submit' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
            {isSubmitting ? <Loader isLoading={isSubmitting} /> : submitText}
         </button>

         {afterSubmitButton && <div dangerouslySetInnerHTML={{ __html: renderToString(afterSubmitButton()) }} />}

         <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
      </form>
   )
}

export { Form }
