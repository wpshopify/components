import { StorefrontContext } from '../../_state/context';
import {
  isCurrentlySelected,
  createSelectionsOfType,
  buildNewSelection,
} from '../../../../common/selections';
import { capitalizeFirstLetter } from '../../../../common/utils';

import StorefrontFilterOptionsGroupItemValue from '../group-item-value';

function StorefrontFilterOptionsGroupItem({
  itemValue,
  itemType,
  displayStyle,
  onSelectionChange,
}) {
  const { useEffect, useContext, useState } = wp.element;
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);
  const [isSelected, setIsSelected] = useState(() => false);

  //   useEffect(() => {
  //     console.log('useEffectuseEffect');

  //     setIsSelected(isCurrentlySelected(storefrontState.selections, itemValue, itemType));
  //   }, [storefrontState['selected' + capitalizeFirstLetter(itemType)]]);

  function onClick() {
    setIsSelected(!isSelected);

    onSelectionChange(itemValue, itemType, isSelected);
  }
  return (
    <StorefrontFilterOptionsGroupItemValue
      displayStyle={displayStyle}
      isSelected={isSelected}
      itemType={itemType}
      itemValue={itemValue}
      onClick={onClick}
    />
  );
}

export { StorefrontFilterOptionsGroupItem };
