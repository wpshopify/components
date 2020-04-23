import { ShopProvider } from './_state/provider'
import { ShopBootstrap } from '../bootstrap'
import { GlobalNotices } from './notices'

function Shop({ options, children }) {
  console.log('<Shop> :: Render Start', options)

  return (
    <ShopProvider options={options}>
      <ShopBootstrap>{children}</ShopBootstrap>
      <GlobalNotices />
    </ShopProvider>
  )
}

export { Shop }
