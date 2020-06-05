import { FilterHook } from '../../../../common/utils'

function TagsHeading() {
  return (
    <FilterHook name='default.storefront.tags.heading'>
      {wp.i18n.__('Tags', 'wpshopify')}
    </FilterHook>
  )
}

export default TagsHeading
