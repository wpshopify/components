import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { Notice } from '../notice'
import { usePortal } from '../../common/hooks'
import { renderToString } from 'react-dom/server'

function Form({ children, onSubmit, noticeState, submitText, hasChanged, beforeSubmitButton, afterSubmitButton, formType }) {
   return (
      <form id='wpshopify-component-customers-${formType}' onSubmit={onSubmit}>
         {hasChanged && <Notice message={noticeState.message} type={noticeState.type} />}

         {children}

         {beforeSubmitButton && <div dangerouslySetInnerHTML={{ __html: renderToString(beforeSubmitButton()) }} />}

         <button type='submit' className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
            {submitText}
         </button>

         {afterSubmitButton && <div dangerouslySetInnerHTML={{ __html: renderToString(afterSubmitButton()) }} />}

         <input type='hidden' className='wpshopify-input wpshopify-input-nonce' />
      </form>
   )
}

export { Form }
