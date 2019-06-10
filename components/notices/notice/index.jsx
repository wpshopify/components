import React from 'react'

function Notice(props) {
   return <p className={'wps-notice wps-notice-' + props.type}>{props.message}</p>
}

export { Notice }
