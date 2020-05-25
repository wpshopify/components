import { ShopProvider } from './_state/provider'
import { ShopBootstrap } from '../bootstrap'
import { GlobalNotices } from './notices'

function Shop({ children }) {
  console.log('::::: Shop 1 :::::')
  return (
    <ShopProvider>
      <ShopBootstrap>{children}</ShopBootstrap>
      <GlobalNotices />
    </ShopProvider>
  )
}

export { Shop }
