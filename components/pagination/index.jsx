import { PaginationControls } from './controls'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notices } from '../notices'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element

function Pagination({ children, shopSettings }) {
  const [itemsState] = useContext(ItemsContext)

  function isHidingPagination() {
    if (shopSettings.hidePagination) {
      return true
    }

    if (itemsState.payloadSettings.pagination) {
      return false
    } else {
      return true
    }
  }

  function showNotices() {
    if (isEmpty(itemsState.payload) && !itemsState.isLoading) {
      return true
    }

    return false
  }

  function isAlignHeight() {
    if (itemsState.payloadSettings.alignHeight) {
      return true
    }

    if (shopSettings.general.alignHeight) {
      return true
    }

    return false
  }

  return (
    <PaginationProvider options={itemsState}>
      {!isEmpty(itemsState.notices) && (
        <Notices
          notices={itemsState.notices}
          dropzone={document.querySelector(itemsState.payloadSettings.dropzoneNotices)}
          noticeGroup='storefront'
        />
      )}

      {showNotices() ? (
        <Notice status='info' isDismissible={false}>
          {itemsState.noResultsText}
        </Notice>
      ) : (
        <PaginationItems alignHeight={isAlignHeight()}>{children}</PaginationItems>
      )}

      {!isHidingPagination() && <PaginationControls />}
    </PaginationProvider>
  )
}

export { Pagination }
