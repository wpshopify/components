import { ItemsContext } from '../_state/context'
import { fetchNewItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'
import ProductPlaceholder from '../../products/product/placeholder'

import to from 'await-to-js'

const { useContext, useEffect } = wp.element

const Item = wp.element.memo(function ({ children, limit = false, infiniteScroll = false }) {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isMounted = useIsMounted()
  const isFirstRender = useIsFirstRender()

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
    console.log('.............. error', error)
    console.log('.............. newItems', newItems)

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

    if (!newItems) {
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

    console.log('<Item> :: getNewItems AFTER')
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

  return itemsState.payload ? children : <ProductPlaceholder />
})

export { Item }
