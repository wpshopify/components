import { ItemsProvider } from './_state/provider';
import Item from './item';
import { usePortal } from '../../common/hooks';
const { Suspense } = wp.element;

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
      payload={props.component.payload && props.component.payload}
      afterLoading={props.afterLoading && props.afterLoading}
      beforeLoading={props.beforeLoading && props.beforeLoading}
      isParentLoading={props.isParentLoading}>
      {usePortal(
        <Suspense fallback={false}>
          <Item limit={props.limit} infiniteScroll={props.infiniteScroll}>
            {props.children}
          </Item>
        </Suspense>,
        props.component.componentElement
      )}
    </ItemsProvider>
  );
}

function Items(props) {
  console.log('props.options', props.options);

  return props.options
    ? props.options.map((component) => (
        <ItemWrapper key={component.componentId} component={component} {...props} />
      ))
    : null;
}

export { Items };
