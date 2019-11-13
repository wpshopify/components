import React, { useEffect, useContext } from "react"
import { formatPriceToCurrency } from "../../../../common/pricing/formatting"
import { pulse, useAnime } from "../../../../common/animations"
import { CartContext } from "../../_state/context"

function CartFooterTotal({ isReady, totalElement, currencyCode }) {
  const animate = useAnime(pulse)
  const [cartState] = useContext(CartContext)

  useEffect(() => {
    if (!isReady) {
      return
    }
    animate(totalElement.current)
  }, [cartState.total])

  return (
    <div className="baseline row align-items-end justify-content-between m-0">
      <p className="wps-total-prefix p-0">Subtotal:</p>
      <p
        className="wps-total-amount col p-0"
        ref={totalElement}
        data-wps-is-ready={isReady ? "1" : "0"}
      >
        {isReady && formatPriceToCurrency(cartState.total, currencyCode)}
      </p>
    </div>
  )
}

export { CartFooterTotal }
