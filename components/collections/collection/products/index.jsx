import { findPortalElement } from '../../../../common/utils'
import { usePortal } from '../../../../common/hooks'
import { Items } from '../../../items'
import { Products } from '../../../products'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'

const { useContext, useRef, useEffect } = wp.element

function CollectionProducts() {
  const [collectionState, collectionDispatch] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)
  const isFirstRender = useRef(true)

  function updateCollectionProducts(payload) {
    collectionDispatch({ type: 'UPDATE_PRODUCTS', payload: payload })
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      return
    }

    collectionDispatch({
      type: 'SET_PRODUCT_OPTIONS',
      payload: [
        {
          componentPayload: collectionState.productOptions[0]
            ? collectionState.productOptions[0].componentPayload
            : collectionState.products,
          payloadSettings: itemsState.payloadSettings.products,
          componentConnectionParams: itemsState.payloadSettings.componentConnectionParams,
          componentElement: false,
          dataType: 'products',
          type: 'list',
          noResultsText: 'No products left to show',
          originalParams: {
            type: 'collections',
            queryParams: itemsState.queryParams,
            connectionParams: {
              first: parseInt(itemsState.payloadSettings.products.pageSize),
              reverse: itemsState.payloadSettings.products.reverse,
              sortKey: itemsState.payloadSettings.products.sortBy,
            },
          },
          componentQueryParams: {
            first: parseInt(itemsState.payloadSettings.products.pageSize),
            reverse: itemsState.payloadSettings.products.reverse,
            sortKey: itemsState.payloadSettings.products.sortBy,
          },
        },
      ],
    })
  }, [])

  return usePortal(
    <Items options={collectionState.productOptions} afterLoading={updateCollectionProducts}>
      <Products />
    </Items>,
    findPortalElement(itemsState.element, itemsState.payloadSettings.dropzoneCollectionProducts)
  )
}

export { CollectionProducts }
