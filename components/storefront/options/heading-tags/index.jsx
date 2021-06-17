import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function TagsHeading() {
  return (
    <FilterHook name='default.storefront.tags.heading'>
      {wp.i18n.__('Tags', 'wpshopify')}
    </FilterHook>
  );
}

export default TagsHeading;
