import { ItemsContext } from '../items/_state/context'
import { StorefrontProvider } from './_state/provider'
import { StorefrontSelections } from './selections'
import { StorefrontOptions } from './options'
import { StorefrontSorting } from './sorting'
import StorefrontItems from './items'

const { useContext } = wp.element

function Storefront() {
  const [itemsState] = useContext(ItemsContext)

  return (
    <StorefrontProvider element={itemsState.element} payloadSettings={itemsState.payloadSettings}>
      {itemsState.payloadSettings.dropzoneSelections && <StorefrontSelections />}
      {itemsState.payloadSettings.dropzoneSorting && <StorefrontSorting />}
      <StorefrontOptions payloadSettings={itemsState.payloadSettings} />
      <StorefrontItems
        noResultsText={itemsState.noResultsText}
        isLoading={itemsState.isLoading}
        queryParams={itemsState.queryParams}
        payload={itemsState.payload}
        payloadSettings={itemsState.payloadSettings}
      />
    </StorefrontProvider>
  )
}

export { Storefront }
