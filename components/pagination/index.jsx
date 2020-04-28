import { PaginationControls } from './controls'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notices } from '../notices'
import isEmpty from 'lodash/isEmpty'

const { useContext, Suspense } = wp.element

function Pagination({ children }) {
  const [itemsState] = useContext(ItemsContext)

  console.log('<Pagination> :: Render Start')
  function isHidingPagination() {
    if (wpshopify.settings.general.hidePagination) {
      return true
    }

    if (
      itemsState.payloadSettings.limit &&
      itemsState.payloadSettings.limit < itemsState.payloadSettings.pageSize
    ) {
      return true
    }

    if (itemsState.payloadSettings.pagination) {
      return false
    } else {
      return true
    }
  }

  return (
    <PaginationProvider>
      {!isEmpty(itemsState.notices) && (
        <Notices
          notices={itemsState.notices}
          dropzone={document.querySelector(itemsState.payloadSettings.dropzoneNotices)}
          noticeGroup='storefront'
        />
      )}

      <PaginationItems>{children}</PaginationItems>

      {!isHidingPagination() && (
        <Suspense fallback={''}>
          <PaginationControls />
        </Suspense>
      )}
    </PaginationProvider>
  )
}

export { Pagination }
