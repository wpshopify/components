function Notice({ message, type }) {
  return <p className={'wps-notice wps-notice-' + type}>{message}</p>
}

export { Notice }
