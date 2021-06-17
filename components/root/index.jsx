function RootElement({ payloadSettingsId, componentId, componentType = 'products' }) {
  return (
    <div
      data-wpshopify-component
      data-wpshopify-component-id={componentId}
      data-wpshopify-component-type={componentType}
      role={componentType}
      data-wpshopify-payload-settings={payloadSettingsId}></div>
  );
}

export { RootElement };
