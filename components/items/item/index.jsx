import { ItemsContext } from '../_state/context'
import { fetchNewItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'
import ProductPlaceholder from '../../products/product/placeholder'

import to from 'await-to-js'

function Item({ children, limit = false, infiniteScroll = false }) {
  const { useContext, useEffect } = wp.element
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isMounted = useIsMounted()
  const isFirstRender = useIsFirstRender()
  const { Notice } = wp.components

  async function getNewItems(itemsState) {
    itemsDispatch({
      type: 'SET_IS_LOADING',
      payload: true,
    })

    itemsDispatch({
      type: 'UPDATE_NOTICES',
      payload: [],
    })

    const [error, newItems] = await to(fetchNewItems(itemsState))

    if (error) {
      if (isMounted.current) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        })

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      }

      return
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

    if (!newItems || !newItems.length) {
      itemsDispatch({
        type: 'UPDATE_TOTAL_SHOWN',
        payload: 0,
      })

      itemsDispatch({
        type: 'UPDATE_PAYLOAD',
        payload: {
          items: [],
          replace: true,
        },
      })
    } else {
      itemsDispatch({
        type: 'UPDATE_TOTAL_SHOWN',
        payload: newItems.length,
      })

      itemsDispatch({
        type: 'UPDATE_PAYLOAD',
        payload: {
          items: newItems,
          replace: true,
        },
      })

      if (itemsState.afterLoading) {
        itemsState.afterLoading(newItems)
      }
    }
  }

  /*
  
  These deps require a new fetch when changed.
  
  */

  useEffect(() => {
    if (itemsState.hasParentPayload) {
      return
    }

    wp.hooks.doAction('before.payload.update', itemsState)

    if (itemsState.beforeLoading) {
      itemsState.beforeLoading()
    }

    getNewItems(itemsState)
  }, [itemsState.queryParams])

  /*
  
  These deps don't require a new fetch, but still require a new render when changed.
  
  */
  useEffect(() => {
    if (itemsState.isLoading || isFirstRender.current) {
      return
    }

    if (!itemsState.payload) {
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

  return !itemsState.payload ? (
    <ProductPlaceholder />
  ) : !itemsState.payload.length ? (
    <Notice status='info' isDismissible={false}>
      {itemsState.noResultsText}
    </Notice>
  ) : (
    children
  )
}

export default wp.element.memo(Item)
