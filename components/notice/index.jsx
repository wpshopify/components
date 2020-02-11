function Notice({ message, type }) {
  return (
    message && (
      <p
        className={'wps-notice wps-notice-' + type}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    )
  )
}

export { Notice }
