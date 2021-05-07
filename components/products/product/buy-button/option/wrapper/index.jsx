import { ProductOptionContext } from '../_state/context';
import { useProductState } from '../../../_state/hooks';
import { isPairMatch } from '../../../../../../common/utils';

import isEmpty from 'lodash/isEmpty';
const { useContext, useEffect, useRef } = wp.element;

function ProductOptionWrapper({ children }) {
  const productState = useProductState();
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isPairMatch(productState.availableVariants, productOptionState.selectedOption)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false,
      });
    }
  }, [productState.availableVariants]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isEmpty(productState.availableVariants) && isEmpty(productState.selectedOptions)) {
      return;
    }

    if (isEmpty(productState.selectedOptions)) {
      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: false,
      });

      productOptionDispatch({
        type: 'SET_SELECTED_OPTION',
        payload: {},
      });

      return;
    }
  }, [productState.selectedOptions]);

  return children;
}

export default ProductOptionWrapper;
