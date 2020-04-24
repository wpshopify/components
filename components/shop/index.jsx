import { ShopProvider } from './_state/provider'
import { ShopBootstrap } from '../bootstrap'
import { GlobalNotices } from './notices'

function Shop({ options, children }) {
  return (
    <ShopProvider options={options}>
      <ShopBootstrap>{children}</ShopBootstrap>
      <GlobalNotices />
    </ShopProvider>
  )
}

export { Shop }
