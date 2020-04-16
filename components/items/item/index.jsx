import { ItemsContext } from '../_state/context'
import isEqual from 'lodash/isEqual'
import { fetchNewItems } from './api'
const { useContext, useRef, useEffect } = wp.element

function Item({ children, customQueryParams, limit = false, infiniteScroll = false }) {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isFirstRender = useRef(true)

  useEffect(() => {
    wp.hooks.doAction('before.payload.update', itemsState)
    console.log('---------')

    fetchNewItems(itemsState, itemsDispatch)
  }, [itemsState.queryParams])

  // Run after every render. Make sure this only runs when customQueryParams changes
  useEffect(() => {
    if (!customQueryParams || itemsState.isLoading) {
      return
    }

    if (!isEqual(itemsState.queryParams, customQueryParams)) {
      itemsDispatch({
        type: 'SET_QUERY_PARAMS',
        payload: customQueryParams,
      })
    }
  }, [customQueryParams])

  useEffect(() => {
    if (itemsState.isLoading) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: itemsState.payload,
        replace: false,
      },
    })
  }, [limit, infiniteScroll])

  return <>{children}</>
}

export { Item }
