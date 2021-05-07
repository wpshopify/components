import {
  useIsMounted,
  useIsFirstRender,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks';

import {
  fetchNextPage,
  graphQuery,
  fetchNewItems,
  getTemplate,
  getCache,
  setCache,
  isWordPressError,
  getWordPressErrorMessage,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';

import { queryOptionsNoRefetch } from '../../../common/queries';

import to from 'await-to-js';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import { useQuery } from 'react-query';

function sanitizeQueryResponse(response, type) {
  if (type === 'storefront' || type === 'search') {
    type = 'products';
  }

  if (!response.model) {
    return [];
  }

  return response.model[type];
}

function resendInitialQuery(state) {
  var originalDataType = has(state.originalParams, 'type')
    ? state.originalParams.type
    : state.dataType;
  var originalQueryParams = state.originalParams
    ? state.originalParams.queryParams
    : state.queryParams;
  var connectionParams = has(state.originalParams, 'connectionParams')
    ? state.originalParams.connectionParams
    : false;

  return graphQuery(originalDataType, originalQueryParams, connectionParams);
}

function hasNextPageQueryAndPath(payload) {
  if (!payload || isEmpty(payload)) {
    return false;
  }

  // Checks if the latest item in the payload has the nextPageQueryAndPath method
  return has(payload[payload.length - 1], 'nextPageQueryAndPath');
}

/*

Fetch NEXT items

*/
function fetchNextItems(itemsState, itemsDispatch) {
  return new Promise(async (resolve, reject) => {
    if (isEmpty(itemsState.payload)) {
      return;
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: true });

    if (itemsState.beforeLoading) {
      itemsState.beforeLoading(itemsState);
    }

    /*

   This check is needed because of our caching system. The "next page" of products is fetched 
   using the payload of the last page. This is using the built in Shopify buy SDK method fetchNextPage.

   This Shopify function calls the method hasNextPageQueryAndPath on the last payload item.

   Since our caching system strips all functions from the payload, we loose the ability to call these built in functions.

   So before loading more, we need to check whether this method exists on the last item in our payload. If it does, we can simply proceed. If not, we need to refetch the initial query first. 

   */
    if (!hasNextPageQueryAndPath(itemsState.payload)) {
      const [resendInitialError, resendInitialResp] = await to(resendInitialQuery(itemsState));

      if (resendInitialError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: resendInitialError },
        });

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

        return reject(resendInitialError);
      }

      var productsExisting = sanitizeQueryResponse(resendInitialResp, itemsState.dataType);
    } else {
      var productsExisting = itemsState.payload;
    }

    var [resultsError, results] = await to(fetchNextPage(productsExisting));

    if (resultsError) {
      const [initialError, initialResponse] = await to(resendInitialQuery(itemsState));

      if (initialError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: initialError },
        });
        itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

        return reject(initialError);
      } else {
        if (
          itemsState.dataType === 'collections' ||
          itemsState.originalParams.type === 'collections'
        ) {
          if (!itemsState.originalParams) {
            var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType);
          } else {
            var nextPayload = sanitizeQueryResponse(
              initialResponse,
              itemsState.originalParams.type
            );

            if (!nextPayload || !nextPayload.length) {
              itemsDispatch({ type: 'SET_IS_LOADING', payload: false });
              return;
            }

            nextPayload = nextPayload[0][itemsState.originalParams.type];
          }
        } else {
          var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType);
        }

        var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload));

        if (finalResultsError) {
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: { type: 'error', message: finalResultsError },
          });
          itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

          return reject(initialError);
        } else {
          var nextItems = finalResults.model;
        }
      }
    } else {
      var nextItems = results.model;
    }

    itemsDispatch({
      type: 'UPDATE_TOTAL_SHOWN',
      payload: nextItems.length,
    });

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: nextItems,
        skipCache: true,
        replace: false,
      },
    });

    itemsDispatch({ type: 'SET_IS_LOADING', payload: false });

    if (itemsState.afterLoading) {
      itemsState.afterLoading(nextItems);
    }

    resolve(results);
  });
}

function useGetItemsQuery(itemsState, itemsDispatch, isMounted) {
  return useQuery(
    'items::new',
    () => {
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true });

      return fetchNewItems(itemsState);
    },
    {
      enabled: itemsState.isFetchingNew,
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

        itemsDispatch({
          type: 'SET_IS_FETCHING_NEW',
          payload: false,
        });
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

        itemsDispatch({
          type: 'SET_IS_FETCHING_NEW',
          payload: false,
        });
      },
      ...queryOptionsNoRefetch,
    }
  );
}

function useTemplateQuery(data = false) {
  return useQuery(
    'templates',
    () => {
      return new Promise((resolve, reject) => {
        return resolve(data);
      });
    },
    {
      ...queryOptionsNoRefetch,
    }
  );
}

function useGetTemplateQuery(itemsState, itemsDispatch) {
  var resultcache = getCache('wps-template-' + itemsState.payloadSettings.htmlTemplate);

  if (!itemsState.payloadSettings.htmlTemplate) {
    return useTemplateQuery();
  }

  if (wp.hooks.applyFilters('wpshopify.cache.templates', false) && resultcache) {
    itemsDispatch({
      type: 'UPDATE_HTML_TEMPLATE',
      payload: resultcache,
    });

    return useTemplateQuery(resultcache);
  }

  return useQuery(
    'templates',
    () => {
      return getTemplate(itemsState.payloadSettings.htmlTemplate);
    },
    {
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
      ...queryOptionsNoRefetch,
    }
  );
}

export { fetchNextItems, useGetItemsQuery, useGetTemplateQuery };
