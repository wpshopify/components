import { useItemsState, useItemsDispatch } from '../_state/hooks';
import {
  useIsFirstRender,
  useIsMounted,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks';

import { useGetItemsQuery, useGetTemplateQuery } from './api';

const Placeholder = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Placeholder-public' */ '../../../common/placeholders')
);

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../notice')
);

function Item({ children, limit = false, infiniteScroll = false }) {
  const { useEffect } = wp.element;

  const itemsState = useItemsState();
  const itemsDispatch = useItemsDispatch();

  const isMounted = useIsMounted();
  const isFirstRender = useIsFirstRender();
  const getTemplateQuery = useGetTemplateQuery(itemsState, itemsDispatch);
  const getItemsQuery = useGetItemsQuery(itemsState, itemsDispatch, isMounted);

  function showGlobalNotice(dataType) {
    if (dataType === 'storefront' || dataType === 'search') {
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (itemsState.hasParentPayload) {
      if (itemsState.isBootstrapping) {
        itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
      }
      return;
    }

    if (itemsState.beforeLoading) {
      itemsState.beforeLoading();
    }

    if (isFirstRender.current) {
      return;
    }

    itemsDispatch({ type: 'SET_IS_FETCHING_NEW', payload: true });

    wp.hooks.doAction('before.payload.update', itemsState);
  }, [itemsState.queryParams]);

  useEffect(() => {
    wp.hooks.doAction('after.payload.update', itemsState);
  }, [itemsState.payload]);

  /*
  
  These deps don't require a new fetch, but still require a new render when changed.
  
  */
  useEffect(() => {
    if (itemsState.isLoading || isFirstRender.current) {
      return;
    }

    if (!itemsState.payload) {
      return;
    }

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: itemsState.payload,
        replace: false,
      },
    });
  }, [limit, infiniteScroll]);

  return !itemsState.hasParentPayload && itemsState.isBootstrapping ? (
    <Placeholder type={itemsState.payloadSettings.componentType} />
  ) : !itemsState.payload.length && showGlobalNotice(itemsState.dataType) ? (
    itemsState.notices.length ? (
      <Notice status={itemsState.notices[0].type} isDismissible={false}>
        {itemsState.notices[0].message}
      </Notice>
    ) : (
      <Notice status='info' isDismissible={false}>
        {itemsState.noResultsText}
      </Notice>
    )
  ) : children ? (
    children
  ) : null;
}

export default wp.element.memo(Item);
