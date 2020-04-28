import { usePortal } from '../../../common/hooks'
import { ItemsContext } from '../../items/_state/context'
import { StorefrontContext } from '../_state/context'
import { Products } from '../../products'
import { animeStaggerFadeIn } from '../../../common/animations'

const { useEffect, useContext } = wp.element

function StorefrontItems() {
  const [itemsState] = useContext(ItemsContext)
  const [storefrontState] = useContext(StorefrontContext)

  useEffect(
    function () {
      if (itemsState.isLoading) {
        return
      }

      animeStaggerFadeIn(
        document.querySelectorAll(
          '.wps-item[data-is-first-item="true"], .wps-item[data-is-first-item="true"] ~ div'
        )
      )
    },
    [itemsState.isLoading]
  )

  function buildOptions() {
    console.log('itemsState >>>>>>', itemsState)

    return {
      payload: itemsState.payload,
      products:
        itemsState.payload &&
        itemsState.payload.map((product) => {
          return {
            product: product,
            element: false,
            gid: false,
            excludes: false,
            renderFromServer: false,
            selectedVariant: false,
            payloadSettings: {
              pagination: true,
            },
          }
        }),
      dataType: 'products',
      originalParams: {
        type: 'products',
        queryParams: itemsState.queryParams,
        connectionParams: false,
      },
      type: 'storefront',
      payloadSettings: itemsState.payloadSettings,
      noResultsText: itemsState.payloadSettings.noResultsText,
    }
  }

  return usePortal(
    <Products options={buildOptions()} />,
    document.querySelector(storefrontState.payloadSettings.dropzonePayload)
  )
}

export { StorefrontItems }
