import { StorefrontContext } from '../_state/context';
import { buildQueryStringFromSelections, getInitialSelections } from '../_common';
import forOwn from 'lodash/forOwn';

function StorefrontWrapper({ children, itemsState, itemsDispatch }) {
  const { useContext, useEffect, useRef } = wp.element;
  const isFirstRender = useRef(true);
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

  function updateFetchParamsQuery() {
    return {
      query: buildQueryStringFromSelections(
        storefrontState.selections,
        itemsState.payloadSettings.connective
      ),
    };
  }

  function setInitialSelections() {
    var initialSelections = getInitialSelections(storefrontState.payloadSettings.filterParams);

    storefrontDispatch({
      type: 'SET_SELECTIONS',
      payload: initialSelections,
    });

    forOwn(initialSelections, function (value, key) {
      if (key !== 'available_for_sale' && key !== 'availableForSale') {
        storefrontDispatch({
          type: 'SET_SELECTED_' + key.toUpperCase(),
          payload: value,
        });
      }
    });
  }

  useEffect(() => {
    if (isFirstRender.current) {
      setInitialSelections();

      isFirstRender.current = false;
      return;
    }

    itemsDispatch({
      type: 'MERGE_QUERY_PARAMS',
      payload: updateFetchParamsQuery(),
    });
  }, [storefrontState.selections]);

  return children;
}

export default StorefrontWrapper;
