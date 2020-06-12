import { Products } from '../../../products'
import { usePortal } from '../../../../common/hooks'
import { SearchContext } from '../../_state/context'

function SearchItems({ payload, payloadSettings, queryParams, noResultsText }) {
  const { useEffect, useContext, useRef } = wp.element
  const [searchState] = useContext(SearchContext)
  const initialRender = useRef(true)
  const { Notice } = wp.components

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
  }, [])

  function buildOptions() {
    return {
      payload: payload,
      products:
        payload &&
        payload.map((product) => {
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
      dataType: payloadSettings.dataType,
      originalParams: {
        type: payloadSettings.dataType,
        queryParams: queryParams,
        connectionParams: false,
      },
      queryParams: queryParams,
      type: payloadSettings.dataType,
      payloadSettings: payloadSettings,
      noResultsText: payloadSettings.noResultsText,
    }
  }

  return usePortal(
    <>
      {!initialRender.current &&
        (!payload.length ? (
          <Notice status='info' isDismissible={false}>
            {noResultsText}
          </Notice>
        ) : (
          searchState.searchTerm && <Products options={buildOptions()} />
        ))}
    </>,
    document.querySelector(payloadSettings.dropzonePayload)
  )
}

export default SearchItems
