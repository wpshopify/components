import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function TagsHeading() {
  return (
    <FilterHook name='default.storefront.tags.heading'>
      {wp.i18n.__('Tags', 'wpshopify')}
    </FilterHook>
  );
}

export default TagsHeading;
