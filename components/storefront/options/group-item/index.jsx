import StorefrontFilterOptionsGroupItemValue from '../group-item-value';

function StorefrontFilterOptionsGroupItem({
  itemValue,
  itemType,
  displayStyle,
  onSelectionChange,
}) {
  const { useState } = wp.element;
  const [isSelected, setIsSelected] = useState(false);

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
