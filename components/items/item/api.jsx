import {
  fetchNextPage,
  graphQuery,
  fetchNewItems,
  getTemplate,
  getCache,
  setCache,
  isWordPressError,
  getWordPressErrorMessage,
  queryOptionsNoRefetch,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';

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

function useGetItemsQuery(state, dispatch, isMounted) {
  return useQuery(
    'items::new::' + state.newQueryId,
    () => {
      dispatch({ type: 'SET_IS_LOADING', payload: true });

      return fetchNewItems(state);
    },
    {
      enabled: state.isFetchingNew && !state.hasParentPayload,
      onError: (error) => {
        if (isMounted.current) {
          dispatch({ type: 'SET_IS_LOADING', payload: false });

          if (state.isBootstrapping) {
            dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }
        }

        dispatch({
          type: 'SET_IS_FETCHING_NEW',
          payload: false,
        });
      },
      onSuccess: (newItems) => {
        if (isMounted.current) {
          dispatch({ type: 'SET_IS_LOADING', payload: false });

          if (state.isBootstrapping) {
            dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }

          if (!newItems || !newItems.length) {
            dispatch({
              type: 'UPDATE_TOTAL_SHOWN',
              payload: 0,
            });

            dispatch({
              type: 'UPDATE_PAYLOAD',
              payload: {
                items: [],
                replace: true,
              },
            });
          } else {
            dispatch({
              type: 'UPDATE_TOTAL_SHOWN',
              payload: newItems.length,
            });

            dispatch({
              type: 'UPDATE_PAYLOAD',
              payload: {
                items: newItems,
                replace: true,
              },
            });

            if (state.afterLoading) {
              state.afterLoading(newItems);
            }
          }
        }

        dispatch({
          type: 'SET_IS_FETCHING_NEW',
          payload: false,
        });
      },
      ...queryOptionsNoRefetch,
    }
  );
}

function useTemplateQuery(data = false, dispatch) {
  return useQuery(
    'templates',
    () => {
      return new Promise((resolve, reject) => {
        dispatch({
          type: 'UPDATE_HTML_TEMPLATE_DATA',
          payload: data,
        });

        return resolve(data);
      });
    },
    {
      ...queryOptionsNoRefetch,
    }
  );
}

function useGetTemplateQuery(state, dispatch) {
  var resultcache = getCache('wps-template-' + state.payloadSettings.htmlTemplate);

  if (!state.payloadSettings.htmlTemplate) {
    return useTemplateQuery(state.payloadSettings.htmlTemplateData, dispatch);
  }

  if (wp.hooks.applyFilters('wpshopify.cache.templates', false) && resultcache) {
    dispatch({
      type: 'UPDATE_HTML_TEMPLATE_DATA',
      payload: resultcache,
    });

    return useTemplateQuery(resultcache, dispatch);
  }

  return useQuery(
    'templates',
    () => {
      return getTemplate(state.payloadSettings.htmlTemplate);
    },
    {
      enabled: !!state.htmlTemplate,
      onError: (error) => {
        dispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });

        dispatch({ type: 'SET_IS_LOADING', payload: false });

        if (state.isBootstrapping) {
          dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
        }
      },
      onSuccess: (template) => {
        if (isWordPressError(template)) {
          dispatch({ type: 'SET_IS_LOADING', payload: false });

          dispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: getWordPressErrorMessage(template),
            },
          });

          if (state.isBootstrapping) {
            dispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
          }

          return;
        }

        setCache('wps-template-' + state.payloadSettings.htmlTemplate, template.data);

        dispatch({
          type: 'UPDATE_HTML_TEMPLATE_DATA',
          payload: template.data,
        });
      },
      ...queryOptionsNoRefetch,
    }
  );
}

export { fetchNextItems, useGetItemsQuery, useGetTemplateQuery };
