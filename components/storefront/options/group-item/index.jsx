import StorefrontFilterOptionsGroupItemValue from '../group-item-value';
import { StorefrontContext } from '../../_state/context';
import { capitalizeFirstLetter } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function StorefrontFilterOptionsGroupItem({
  itemValue,
  itemType,
  displayStyle,
  onSelectionChange,
}) {
  const { useState, useEffect, useContext } = wp.element;
  const [isSelected, setIsSelected] = useState(false);
  const [storefrontState] = useContext(StorefrontContext);

  function onClick() {
    setIsSelected(!isSelected);
    onSelectionChange(itemValue, itemType, isSelected);
  }

  useEffect(() => {
    if (!storefrontState.hasSelections) {
      setIsSelected(false);
    }

    if (!storefrontState['selected' + capitalizeFirstLetter(itemType)].includes(itemValue)) {
      setIsSelected(false);
    }
  }, [
    storefrontState.hasSelections,
    storefrontState['selected' + capitalizeFirstLetter(itemType)],
  ]);

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

export default StorefrontFilterOptionsGroupItem;
