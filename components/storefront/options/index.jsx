import { StorefrontContext } from '../_state/context';
import { StorefrontOptionsProvider } from './_state/provider';
import StorefrontOptionsWrapper from './wrapper';
import {
  createSelectionsOfType,
  buildNewSelection,
  isCurrentlySelected,
} from '../../../common/selections';

import { capitalizeFirstLetter } from '../../../common/utils';

function StorefrontOptions({ payloadSettings }) {
  const { useContext, useEffect } = wp.element;
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

  //   useEffect(() => {
  //     console.log('useEffectuseEffect');

  //     setIsSelected(isCurrentlySelected(storefrontState.selections, itemValue, itemType));
  //   }, [storefrontState['selected' + capitalizeFirstLetter(itemType)]]);

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
    }
  }

  return (
    <StorefrontOptionsProvider>
      <StorefrontOptionsWrapper
        payloadSettings={payloadSettings}
        onSelectionChange={onSelectionChange}
      />
    </StorefrontOptionsProvider>
  );
}

export { StorefrontOptions };
