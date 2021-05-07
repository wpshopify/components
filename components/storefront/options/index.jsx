import { useStorefrontState, useStorefrontDispatch } from '../_state/hooks';
import { StorefrontOptionsProvider } from './_state/provider';
import StorefrontOptionsWrapper from './wrapper';
import { createSelectionsOfType, buildNewSelection } from '../../../common/selections';

function StorefrontOptions({ payloadSettings, itemsDispatch }) {
  const storefrontState = useStorefrontState();
  const storefrontDispatch = useStorefrontDispatch();

  function onSelectionChange(itemValue, itemType, isSelected) {
    const newList = buildNewSelection(itemValue, itemType, isSelected, storefrontState.selections);

    if (newList) {
      storefrontDispatch({
        type: 'SET_SELECTIONS',
        payload: createSelectionsOfType(itemType, newList),
      });

      storefrontDispatch({
        type: 'SET_SELECTED_' + itemType.toUpperCase(),
        payload: newList,
      });

      if (newList.length) {
        storefrontDispatch({
          type: 'SET_HAS_SELECTIONS',
          payload: true,
        });
      } else {
        storefrontDispatch({
          type: 'SET_HAS_SELECTIONS',
          payload: false,
        });
      }
    }
  }

  return (
    <StorefrontOptionsProvider>
      <StorefrontOptionsWrapper
        payloadSettings={payloadSettings}
        onSelectionChange={onSelectionChange}
        dropzoneHeading={storefrontState.payloadSettings.dropzoneHeading}
      />
    </StorefrontOptionsProvider>
  );
}

export default StorefrontOptions;
