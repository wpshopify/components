import { StorefrontOptionsProvider } from './_state/provider'
import StorefrontOptionsWrapper from './wrapper'

function StorefrontOptions({ payloadSettings }) {
  return (
    <StorefrontOptionsProvider>
      <StorefrontOptionsWrapper payloadSettings={payloadSettings} />
    </StorefrontOptionsProvider>
  )
}

export { StorefrontOptions }
