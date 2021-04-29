import { ItemsContext } from '../_state/context';
import {
  fetchNewItems,
  getTemplate,
  getCache,
  setCache,
  isWordPressError,
  getWordPressErrorMessage,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';

import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks';

import {
  isTemplateName,
  getLastFourChars,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

import Placeholder from '../../../common/placeholders';
import { Notice } from '../../notices';

import { useQuery } from 'react-query';

function hasTemplateName(maybeTemplate) {
  if (!maybeTemplate) {
    return false;
  }

  return isTemplateName(getLastFourChars(maybeTemplate));
}

function Item({ children, limit = false, infiniteScroll = false }) {
  const { useContext, useEffect } = wp.element;
  const [itemsState, itemsDispatch] = useContext(ItemsContext);
  const isMounted = useIsMounted();
  const isFirstRender = useIsFirstRender();

  function templateQuery(data = false) {
    return useQuery(
      'templates',
      () => {
        return new Promise((resolve, reject) => {
          return resolve(data);
        });
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false,
      }
    );
  }

  function getTemplateQuery() {
    var resultcache = getCache('wps-template-' + itemsState.payloadSettings.htmlTemplate);

    if (!itemsState.payloadSettings.htmlTemplate) {
      return templateQuery();
    }

    if (wp.hooks.applyFilters('wpshopify.cache.templates', false) && resultcache) {
      itemsDispatch({
        type: 'UPDATE_HTML_TEMPLATE',
        payload: resultcache,
      });

      return templateQuery(resultcache);
    }

    return useQuery(
      'templates',
      () => {
        return getTemplate(itemsState.payloadSettings.htmlTemplate);
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false,
        onError: (error) => {
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: error,
            },
          });

          itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

          if (itemsState.isBootstrapping) {
            itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }
        },
        onSuccess: (template) => {
          if (isWordPressError(template)) {
            itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

            itemsDispatch({
              type: 'UPDATE_NOTICES',
              payload: {
                type: 'error',
                message: getWordPressErrorMessage(template),
              },
            });

            if (itemsState.isBootstrapping) {
              itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
            }

            return;
          }

          setCache('wps-template-' + itemsState.payloadSettings.htmlTemplate, template.data);

          itemsDispatch({
            type: 'UPDATE_HTML_TEMPLATE',
            payload: template.data,
          });
        },
      }
    );
  }

  function getItemsQuery() {
    return useQuery(
      'items',
      () => {
        return fetchNewItems(itemsState);
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false,
        onError: (error) => {
          if (isMounted.current) {
            itemsDispatch({
              type: 'UPDATE_NOTICES',
              payload: error,
            });

            itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

            if (itemsState.isBootstrapping) {
              itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
            }
          }
        },
        onSuccess: (newItems) => {
          if (isMounted.current) {
            itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

            if (itemsState.isBootstrapping) {
              itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
            }

            if (!newItems || !newItems.length) {
              itemsDispatch({
                type: 'UPDATE_TOTAL_SHOWN',
                payload: 0,
              });

              itemsDispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                  items: [],
                  replace: true,
                },
              });
            } else {
              itemsDispatch({
                type: 'UPDATE_TOTAL_SHOWN',
                payload: newItems.length,
              });

              itemsDispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                  items: newItems,
                  replace: true,
                },
              });

              if (itemsState.afterLoading) {
                itemsState.afterLoading(newItems);
              }
            }
          }
        },
      }
    );
  }

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

  getTemplateQuery();
  getItemsQuery();

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
