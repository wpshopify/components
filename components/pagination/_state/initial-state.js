import { isHidingPagination } from '../../../common/pagination'

function PaginationInitialState({ payloadSettings, hasMoreItems }) {
  return {
    controlsTouched: false,
    isHidingPagination: isHidingPagination(payloadSettings, hasMoreItems),
    hasMoreItems: hasMoreItems,
  }
}

export { PaginationInitialState }
