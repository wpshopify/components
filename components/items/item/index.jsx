import { ItemsContext } from '../_state/context'
import { fetchNewItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'

import { __t } from '../../../common/utils'
import to from 'await-to-js'

const { useContext, useEffect } = wp.element

const Item = wp.element.memo(function ({ children, limit = false, infiniteScroll = false }) {
  console.log('<Item> :: Render Start')

  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isMounted = useIsMounted()
  const isFirstRender = useIsFirstRender()

  function updatePayloadState(newItems) {
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

  async function getNewItems(itemsState) {
    const [error, newItems] = await to(fetchNewItems(itemsState))

    if (error) {
      if (isMounted.current) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: __t(error),
          },
        })

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      }

      return
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
    updatePayloadState(newItems)
  }

  /*
  
  These deps require a new fetch when changed.
  
  */

  useEffect(() => {
    console.log('<Item> :: useEffect[itemsState.queryParams] top')
    if (itemsState.hasParentPayload) {
      return
    }

    wp.hooks.doAction('before.payload.update', itemsState)

    if (itemsState.beforeLoading) {
      itemsState.beforeLoading()
    }

    console.log('<Item> :: useEffect[itemsState.queryParams] bottom')

    itemsDispatch({
      type: 'SET_IS_LOADING',
      payload: true,
    })
    itemsDispatch({
      type: 'UPDATE_NOTICES',
      payload: [],
    })
    getNewItems(itemsState)
  }, [itemsState.queryParams])

  /*
  
  These deps don't require a new fetch, but still require a new render when changed.
  
  */
  useEffect(() => {
    console.log('<Item> :: useEffect[limit, infiniteScroll] top')
    if (itemsState.isLoading || isFirstRender.current) {
      return
    }

    if (!itemsState.payload) {
      return
    }

    console.log('<Item> :: useEffect[limit, infiniteScroll] bottom')

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: itemsState.payload,
        replace: false,
      },
    })
  }, [limit, infiniteScroll])

  return <>{children}</>
})

export { Item }
