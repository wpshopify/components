import { StorefrontContext } from '../_state/context';
import { StorefrontSelectionsWrapper } from './wrapper';
import { objectIsEmpty } from '../../../common/utils';
import { usePortal } from '../../../common/hooks';
const { useContext } = wp.element;

function StorefrontSelections({ dropzone }) {
  const [storefrontState] = useContext(StorefrontContext);

  return usePortal(
    !objectIsEmpty(storefrontState.selections) ? <StorefrontSelectionsWrapper /> : '',
    document.querySelector(dropzone)
  );
}

export default StorefrontSelections;
