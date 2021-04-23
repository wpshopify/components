import { ItemsContext } from '../items/_state/context';
import { StorefrontProvider } from './_state/provider';
import { StorefrontSelections } from './selections';
import { StorefrontOptions } from './options';
import { StorefrontSorting } from './sorting';
import StorefrontWrapper from './wrapper';
import StorefrontItems from './items';

const { useContext } = wp.element;

function Storefront() {
  const [itemsState, itemsDispatch] = useContext(ItemsContext);

  return (
    <StorefrontProvider element={itemsState.element} payloadSettings={itemsState.payloadSettings}>
      <StorefrontWrapper itemsState={itemsState} itemsDispatch={itemsDispatch}>
        {itemsState.payloadSettings.dropzoneSelections && (
          <StorefrontSelections dropzone={itemsState.payloadSettings.dropzoneSelections} />
        )}
        {itemsState.payloadSettings.dropzoneSorting && <StorefrontSorting />}
        <StorefrontOptions payloadSettings={itemsState.payloadSettings} />
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
