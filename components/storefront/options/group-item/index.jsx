import StorefrontFilterOptionsGroupItemValue from '../group-item-value';
import { useStorefrontState } from '../../_state/hooks';
import { capitalizeFirstLetter } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function StorefrontFilterOptionsGroupItem({
  itemValue,
  itemType,
  displayStyle,
  onSelectionChange,
}) {
  const { useState, useEffect } = wp.element;
  const [isSelected, setIsSelected] = useState(false);
  const storefrontState = useStorefrontState();

  function onClick() {
    setIsSelected(!isSelected);
    onSelectionChange(itemValue, itemType, isSelected);
  }

  useEffect(() => {
    if (!storefrontState.hasSelections) {
      setIsSelected(false);
    }

    var name = storefrontState['selected' + capitalizeFirstLetter(itemType)];

    if (name && !name.includes(itemValue)) {
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
