import { ShopContext } from '../shop/_state/context'

const { useEffect, useContext } = wp.element

function ShopBootstrap({ children }) {
  const [shopState] = useContext(ShopContext)

  useEffect(() => {
    if (shopState.notices.length) {
      return
    }
  }, [shopState.notices])

  return <>{!shopState.notices.length && children}</>
}

export { ShopBootstrap }
