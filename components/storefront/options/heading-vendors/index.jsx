import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function VendorsHeading() {
  return (
    <FilterHook name='default.storefront.vendors.heading'>
      {wp.i18n.__('Vendors', 'wpshopify')}
    </FilterHook>
  );
}

export default VendorsHeading;
