import { ItemsProvider } from './_state/provider'
import Item from './item'
import { usePortal } from '../../common/hooks'
import { v4 as uuidv4 } from 'uuid'

/*

Responsible for managing state of 'payload', 'queryParams', and 'isLoading'.
Connects sibling components together like Filters, Search and Pagination.

options, children, afterLoading, beforeLoading

<Items> - Represents a ground of one or more products -- an "instance" use by either a shortcode or Render API 
<Item> - Represents one or more products

*/

function ItemWrapper(props) {
  return (
    <ItemsProvider
      component={props.component}
      customQueryParams={props.customQueryParams && props.customQueryParams}
      payload={props.payload && props.payload}
      afterLoading={props.afterLoading && props.afterLoading}
      beforeLoading={props.beforeLoading && props.beforeLoading}>
      {usePortal(
        <Item limit={props.limit} infiniteScroll={props.infiniteScroll}>
          {props.children}
        </Item>,
        props.component.componentElement
      )}
    </ItemsProvider>
  )
}

function Items(props) {
  return (
    props.options &&
    props.options.map((component) => (
      <ItemWrapper key={uuidv4()} component={component} {...props} />
    ))
  )
}

export { Items }
