import { ProductOptionContext } from '../_state/context';
import { ProductContext } from '../../../_state/context';
import isEmpty from 'lodash/isEmpty';
import { isPairMatch } from '../../../../../../common/utils';
const { useContext, useEffect, useRef } = wp.element;

function ProductOptionWrapper({ children }) {
  const [productState, productDispatch] = useContext(ProductContext);
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
      productDispatch({
        type: 'UNSET_SELECTED_OPTIONS',
        payload: productOptionState.option.name,
      });
    }
  }, [productState.availableVariants]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isEmpty(productOptionState.selectedOption)) {
      return;
    }

    productDispatch({
      type: 'SET_AVAILABLE_VARIANTS',
      payload: productOptionState.selectedOption,
    });
  }, [productOptionState.selectedOption]);

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
