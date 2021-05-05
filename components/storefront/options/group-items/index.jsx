import StorefrontFilterOptionsGroupItem from '../group-item';

function StorefrontFilterOptionsGroupItems({
  filterOptions,
  groupType,
  displayStyle,
  onSelectionChange,
}) {
  return (
    <ul className={'wps-' + groupType}>
      {filterOptions.map((item) => (
        <StorefrontFilterOptionsGroupItem
          key={item}
          itemValue={item}
          itemType={groupType}
          displayStyle={displayStyle}
          onSelectionChange={onSelectionChange}
        />
      ))}
    </ul>
  );
}

export default wp.element.memo(StorefrontFilterOptionsGroupItems);
