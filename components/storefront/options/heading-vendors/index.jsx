import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function VendorsHeading() {
  return (
    <FilterHook name='default.storefront.vendors.heading'>
      {wp.i18n.__('Vendors', 'wpshopify')}
    </FilterHook>
  );
}

export default VendorsHeading;
