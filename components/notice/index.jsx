import React from 'react'

function Notice({ type, message }) {
   return <p className={'wps-notice-' + type}>{message}</p>
}

export { Notice }
