import { ProductOptionContext } from '../_state/context';
import { useProductState, useProductDispatch } from '../../../_state/hooks';
import { isPairMatch, createObj } from '../../../../../../common/utils';
import isEmpty from 'lodash/isEmpty';
const { useContext, useEffect, useRef } = wp.element;

function ProductOptionWrapper({ children }) {
  const productState = useProductState();
  const productDispatch = useProductDispatch();
  const [productOptionState, productOptionDispatch] = useContext(ProductOptionContext);
  const isFirstRender = useRef(true);

  // Allows for selecting first variant
  useEffect(() => {
    if (productState.selectFirstVariant) {
      if (
        !productState.payload.availableForSale ||
        !productState.payload.variants[0].availableForSale ||
        !productState.payload.variants[0].selectedOptions
      ) {
        console.warn(
          'WP Shopify warning: Unable to select first variant because product is not available for sale.'
        );
        return;
      }

      var selectedVariant = createObj(
        productState.payload.variants[0].selectedOptions[0].name,
        productState.payload.variants[0].selectedOptions[0].value
      );

      productDispatch({
        type: 'UPDATE_SELECTED_OPTIONS',
        payload: selectedVariant,
      });

      productOptionDispatch({
        type: 'SET_SELECTED_OPTION',
        payload: selectedVariant,
      });

      productOptionDispatch({
        type: 'SET_IS_OPTION_SELECTED',
        payload: true,
      });
    }
  }, []);

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
