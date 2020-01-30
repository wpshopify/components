function RootElement({ componentId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      wpshopify-component
      wpshopify-component-type={componentType}
      wpshopify-component-id={componentId}>
      {loadingMsg}
    </div>
  )
}

export { RootElement }
