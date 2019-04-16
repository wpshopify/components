import React from 'react'

function ProductNotice(props) {
   return <div className={`wps-notice wps-notice-${props.type}`}>{props.children}</div>
}

export { ProductNotice }
