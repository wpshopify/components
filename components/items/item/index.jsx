/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useItemsState, useItemsDispatch } from '../_state/hooks';
import { useIsFirstRender } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-hooks';
import useIsMounted from 'ismounted';

const Placeholder = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Placeholder-public' */ '../../../common/placeholders')
);

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../notice')
);

import { useGetItemsQuery, useGetTemplateQuery } from './api';

function Item({ children, customPayloadSettings, customPayload, isCustomLoading }) {
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

    if (!itemsState.isFetchingNew) {
      itemsDispatch({ type: 'SET_IS_FETCHING_NEW', payload: true });
    }

    wp.hooks.doAction('before.payload.update', itemsState);
  }, [itemsState.queryParams]);

  useEffect(() => {
    wp.hooks.doAction('after.payload.update', itemsState);
  }, [itemsState.payload]);

  /*
  
  These deps don't require a new fetch, but still require a new render when changed.
  
  */
  useEffect(() => {
    if (itemsState.isLoading || isFirstRender) {
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
  }, [itemsState.payloadSettings.limit]);

  useEffect(() => {
    if (itemsState.isLoading || isFirstRender) {
      return;
    }

    if (!customPayload) {
      return;
    }

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: customPayload,
        skipCache: true,
        replace: true,
      },
    });
  }, [customPayload]);

  useEffect(() => {
    if (itemsState.isLoading || isFirstRender) {
      return;
    }

    if (!itemsState.payload) {
      return;
    }

    itemsDispatch({
      type: 'UPDATE_PAYLOAD_SETTINGS',
      payload: customPayloadSettings,
    });
  }, [customPayloadSettings]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: isCustomLoading });
  }, [isCustomLoading]);

  return !itemsState.hasParentPayload && itemsState.isBootstrapping ? (
    <Placeholder type={itemsState.payloadSettings.componentType} />
  ) : !itemsState.payload && showGlobalNotice(itemsState.dataType) ? (
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

export default Item;
