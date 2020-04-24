import { ItemsContext } from '../_state/context'
import { fetchNewItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'
const { useContext, useRef, useEffect } = wp.element
import to from 'await-to-js'
const { __ } = wp.i18n

const Item = wp.element.memo(function ({ children, limit = false, infiniteScroll = false }) {
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
      console.log('....... error', error)
      console.log('isMountedisMountedisMounted')

      if (isMounted.current) {
        console.log('111111111111111111111111')

        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: __(error, wpshopify.misc.textdomain),
          },
        })

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
      }

      return
    }

    console.log('00000000000000000000000000000000')

    itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
    updatePayloadState(newItems)
  }

  useEffect(() => {
    if (itemsState.hasParentPayload) {
      return
    }

    if (isMounted) {
      wp.hooks.doAction('before.payload.update', itemsState)

      if (itemsState.beforeLoading) {
        itemsState.beforeLoading()
      }

      itemsDispatch({
        type: 'SET_IS_LOADING',
        payload: true,
      })
      itemsDispatch({
        type: 'UPDATE_NOTICES',
        payload: [],
      })
      console.log('444444444444444444444444444444444')
      getNewItems(itemsState)
    }
  }, [itemsState.queryParams])

  useEffect(() => {
    if (itemsState.isLoading || isFirstRender.current) {
      return
    }

    if (!itemsState.payload) {
      return
    }

    console.log('<Item> :: useEffect[limit, infiniteScroll]', itemsState.payload)

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
