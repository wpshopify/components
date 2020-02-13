function RootElement({ componentOptionsId, loadingMsg, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-type={componentType}
      data-wpshopify-component-options={componentOptionsId}>
      {loadingMsg}
    </div>
  )
}

export { RootElement }
