import { SearchContext } from '../../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { Products } from '../../../products'
import { usePortal } from '../../../../common/hooks'

const { useEffect, useContext, useRef } = wp.element

function SearchItems() {
  const [searchState] = useContext(SearchContext)
  const [itemsState] = useContext(ItemsContext)
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
  }, [])

  function buildOptions() {
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
      dataType: itemsState.payloadSettings.dataType,
      originalParams: {
        type: itemsState.payloadSettings.dataType,
        queryParams: itemsState.queryParams,
        connectionParams: false,
      },
      queryParams: itemsState.queryParams,
      type: itemsState.payloadSettings.dataType,
      payloadSettings: itemsState.payloadSettings,
      noResultsText: itemsState.payloadSettings.noResultsText,
    }
  }

  return usePortal(
    <>{!initialRender.current && <Products options={buildOptions()} />}</>,
    document.querySelector(searchState.payloadSettings.dropzonePayload)
  )
}

export { SearchItems }
