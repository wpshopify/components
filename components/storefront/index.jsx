import { ItemsContext } from '../items/_state/context'
import { StorefrontProvider } from './_state/provider'
import { StorefrontSelections } from './selections'
import { StorefrontOptions } from './options'
import { StorefrontSorting } from './sorting'
import { StorefrontItems } from './items'

const { useContext } = wp.element

function Storefront() {
  const [itemsState] = useContext(ItemsContext)
  console.log('Storefront')

  return (
    <StorefrontProvider options={itemsState}>
      {itemsState.payloadSettings.dropzoneSelections && <StorefrontSelections />}
      {itemsState.payloadSettings.dropzoneSorting && <StorefrontSorting />}
      <StorefrontOptions />
      <StorefrontItems />
    </StorefrontProvider>
  )
}

export { Storefront }
