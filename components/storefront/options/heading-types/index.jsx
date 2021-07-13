import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function TypesHeading() {
  return (
    <FilterHook name='default.storefront.types.heading'>
      {wp.i18n.__('Types', 'wpshopify')}
    </FilterHook>
  );
}

export default TypesHeading;
