function RootElement({ componentId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-component-id={componentId}>
      {loadingMsg}
    </div>
  )
}

export { RootElement }
