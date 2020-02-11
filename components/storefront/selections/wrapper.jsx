import { StorefrontSelectionsClear } from './clear'
import { StorefrontSelectionsTypes } from './types'
import { ItemsContext } from '../../items/_state/context'
import { Loader } from '../../loader'

const { useContext } = wp.element

function StorefrontSelectionsWrapper() {
  const [itemsState] = useContext(ItemsContext)
  return (
    <div className='wps-filter-selections wps-mt-2 wps-mb-2'>
      <Loader
        isLoading={itemsState.isLoading}
        dropzone={itemsState.componentOptions.dropzoneLoader}
        color='#ddd'
      />
      <StorefrontSelectionsTypes />
      <StorefrontSelectionsClear />
    </div>
  )
}

export { StorefrontSelectionsWrapper }
