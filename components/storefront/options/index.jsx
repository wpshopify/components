import { StorefrontOptionsProvider } from './_state/provider'
import { StorefrontOptionsWrapper } from './wrapper'

function StorefrontOptions() {
  console.log('StorefrontOptions')
  return (
    <StorefrontOptionsProvider>
      <StorefrontOptionsWrapper />
    </StorefrontOptionsProvider>
  )
}

export { StorefrontOptions }
