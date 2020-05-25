import { PaginationControls } from './controls'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'

function Pagination({ children }) {
  console.log('::::: Pagination 1 :::::')
  return (
    <PaginationProvider>
      <PaginationItems>{children}</PaginationItems>
      <PaginationControls />
    </PaginationProvider>
  )
}

export default wp.element.memo(Pagination)
