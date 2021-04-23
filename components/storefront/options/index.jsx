import { StorefrontContext } from '../_state/context';
import { StorefrontOptionsProvider } from './_state/provider';
import StorefrontOptionsWrapper from './wrapper';
import { createSelectionsOfType, buildNewSelection } from '../../../common/selections';

function StorefrontOptions({ payloadSettings }) {
  const { useContext } = wp.element;
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

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
