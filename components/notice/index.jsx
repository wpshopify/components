import React from 'react'

function Notice(props) {
   return props.message && <p className={'wps-notice wps-notice-' + props.type} dangerouslySetInnerHTML={{ __html: props.message }} />
}

export { Notice }
