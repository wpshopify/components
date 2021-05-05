import { StorefrontContext } from '../_state/context';
import { StorefrontOptionsProvider } from './_state/provider';
import StorefrontOptionsWrapper from './wrapper';
import { createSelectionsOfType, buildNewSelection } from '../../../common/selections';

function StorefrontOptions({ payloadSettings, itemsDispatch }) {
  const { useContext } = wp.element;
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

  function onSelectionChange(itemValue, itemType, isSelected) {
    const newList = buildNewSelection(itemValue, itemType, isSelected, storefrontState.selections);

    if (newList) {
      itemsDispatch({
        type: 'SET_IS_LOADING',
        payload: true,
      });

      storefrontDispatch({
        type: 'SET_SELECTIONS',
        payload: createSelectionsOfType(itemType, newList),
      });

      storefrontDispatch({
        type: 'SET_SELECTED_' + itemType.toUpperCase(),
        payload: newList,
      });

      if (newList.length) {
        console.log('SET_HAS_SELECTIONS true');
        storefrontDispatch({
          type: 'SET_HAS_SELECTIONS',
          payload: true,
        });
      } else {
        console.log('SET_HAS_SELECTIONS false');

        storefrontDispatch({
          type: 'SET_HAS_SELECTIONS',
          payload: false,
        });
      }
      console.log('.........newList', newList);
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

export default StorefrontOptions;
