import { ShopContext } from '../shop/_state/context'

const { useContext } = wp.element

function ShopBootstrap({ children }) {
  const [shopState] = useContext(ShopContext)

  return !shopState.notices.length && children
}

export { ShopBootstrap }
