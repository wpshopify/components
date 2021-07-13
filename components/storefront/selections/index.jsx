import { StorefrontSelectionsWrapper } from './wrapper';
import { objectIsEmpty } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { usePortal } from '../../../common/hooks';
import { useStorefrontState } from '../_state/hooks';

function StorefrontSelections({ dropzone }) {
  const storefrontState = useStorefrontState();

  return usePortal(
    !objectIsEmpty(storefrontState.selections) ? (
      <StorefrontSelectionsWrapper selections={storefrontState.selections} />
    ) : (
      ''
    ),
    document.querySelector(dropzone)
  );
}

export default StorefrontSelections;
