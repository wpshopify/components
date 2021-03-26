import { StorefrontFilterOptionsGroupItem } from '../group-item';

function StorefrontFilterOptionsGroupItems({
  filterOptions,
  groupType,
  displayStyle,
  onSelectionChange,
}) {
  return filterOptions.map((item) => (
    <StorefrontFilterOptionsGroupItem
      key={item}
      itemValue={item}
      itemType={groupType}
      displayStyle={displayStyle}
      onSelectionChange={onSelectionChange}
    />
  ));
}

export default wp.element.memo(StorefrontFilterOptionsGroupItems);
