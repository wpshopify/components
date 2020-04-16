import { ItemsProvider } from './_state/provider'
import { Item } from './item'
import has from 'lodash/has'
import { usePortal } from '../../common/hooks'
const { useEffect } = wp.element

function hasItems(options) {
  return options.payload.length > 0
}

function skippingInitialLoad(options) {
  if (!has(options, 'skipInitialLoad')) {
    return false
  }

  return options.skipInitialLoad
}

/*

Handle the errors differently ...

*/
function hasItemsToShow(options) {
  if (!options) {
    return false
  }

  if (has(options, 'errors')) {
    return false
  }

  if (!has(options, 'payload')) {
    return true
  }

  if (hasItems(options) || skippingInitialLoad(options)) {
    return true
  } else {
    return false
  }
}

/*

Responsible for managing state of 'payload', 'queryParams', and 'isLoading'.
Connects sibling components together like Filters, Search and Pagination.

options, children, afterLoading, beforeLoading

<Items> - Represents a ground of one or more products -- an "instance" use by either a shortcode or Render API 
<Item> - Represents one or more products

*/

function Items(props) {
  useEffect(() => {
    wp.hooks.doAction('after.items.render', props)
  }, [])

  return (
    props.options &&
    props.options.map((component) => {
      return usePortal(
        <ItemsProvider
          component={component}
          afterLoading={has(props, 'afterLoading') ? props.afterLoading : false}
          beforeLoading={has(props, 'beforeLoading') ? props.beforeLoading : false}>
          <Item
            customQueryParams={props.customQueryParams}
            limit={props.limit}
            infiniteScroll={props.infiniteScroll}>
            {props.children}
          </Item>
        </ItemsProvider>,
        component.componentElement
      )
    })
  )
}

export { Items }
