import { FilterHook } from '../../../../common/utils'

function TypesHeading() {
  return (
    <FilterHook name='default.storefront.types.heading'>
      {wp.i18n.__('Types', 'wpshopify')}
    </FilterHook>
  )
}

export default TypesHeading
