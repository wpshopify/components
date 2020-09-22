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

import to from 'await-to-js';

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
  const { Notice } = wp.components;

  function showGlobalNotice(dataType) {
    if (dataType === 'storefront' || dataType === 'search') {
      return false;
    }

    return true;
  }

  async function getNewItems(itemsState) {
    wp.hooks.doAction('before.payload.update', itemsState);

    itemsDispatch({
      type: 'SET_IS_LOADING',
      payload: true,
    });

    itemsDispatch({
      type: 'UPDATE_NOTICES',
      payload: [],
    });

    if (hasTemplateName(itemsState.payloadSettings.htmlTemplate)) {
      var resultcache = getCache('wps-template-' + itemsState.payloadSettings.htmlTemplate);

      if (wp.hooks.applyFilters('wpshopify.cache.templates', true) && resultcache) {
        itemsDispatch({
          type: 'UPDATE_HTML_TEMPLATE',
          payload: resultcache,
        });
      } else {
        const [templateError, templateString] = await to(
          getTemplate(itemsState.payloadSettings.htmlTemplate)
        );

        if (templateError) {
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: templateError,
            },
          });

          itemsDispatch({ type: 'SET_IS_LOADING', payload: false });
          if (itemsState.isBootstrapping) {
            itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }
          return;
        }

        if (isWordPressError(templateString)) {
          itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: getWordPressErrorMessage(templateString),
            },
          });

          if (itemsState.isBootstrapping) {
            itemsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }

          return;
        }

        setCache('wps-template-' + itemsState.payloadSettings.htmlTemplate, templateString.data);

        itemsDispatch({
          type: 'UPDATE_HTML_TEMPLATE',
          payload: templateString.data,
        });
      }
    }

    const [error, newItems] = await to(fetchNewItems(itemsState));

    if (error) {
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

      return;
    }

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
  }

  /*
  
  These deps require a new fetch when changed.
  
  */

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

    getNewItems(itemsState);
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
