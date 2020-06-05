import { StorefrontFilterOptionsGroupItem } from '../group-item'

function StorefrontFilterOptionsGroupItems({ filterOptions, groupType, displayStyle }) {
  return filterOptions.map((item) => (
    <StorefrontFilterOptionsGroupItem
      key={item}
      itemValue={item}
      itemType={groupType}
      displayStyle={displayStyle}
    />
  ))
}

export default wp.element.memo(StorefrontFilterOptionsGroupItems)
