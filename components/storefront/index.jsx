import { useItemsState, useItemsDispatch } from '../items/_state/hooks';
import { StorefrontProvider } from './_state/provider';

const StorefrontSelections = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontSelections-public' */ './selections')
);

const StorefrontOptions = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontOptions-public' */ './options')
);

const StorefrontSorting = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontSorting-public' */ './sorting')
);

const StorefrontWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontWrapper-public' */ './wrapper')
);

const StorefrontItems = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontItems-public' */ './items')
);

function Storefront() {
  const itemsDispatch = useItemsDispatch();
  const itemsState = useItemsState();

  return (
    <StorefrontProvider element={itemsState.element} payloadSettings={itemsState.payloadSettings}>
      <StorefrontWrapper itemsState={itemsState} itemsDispatch={itemsDispatch}>
        {itemsState.payloadSettings.dropzoneSelections && (
          <StorefrontSelections dropzone={itemsState.payloadSettings.dropzoneSelections} />
        )}
        {itemsState.payloadSettings.dropzoneSorting && <StorefrontSorting />}
        <StorefrontOptions
          payloadSettings={itemsState.payloadSettings}
          itemsDispatch={itemsDispatch}
        />
        <StorefrontItems
          noResultsText={itemsState.noResultsText}
          isLoading={itemsState.isLoading}
          queryParams={itemsState.queryParams}
          payload={itemsState.payload}
          payloadSettings={itemsState.payloadSettings}
        />
      </StorefrontWrapper>
    </StorefrontProvider>
  );
}

export { Storefront };
