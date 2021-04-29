import { ProductBuyButtonTextNotice } from '../notice';
import { findTotalInventoryQuantity } from '../../../../../common/variants';
import {
  getVariantInventoryManagement,
  setCache,
  getCache,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import { useIsMounted } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks';
import to from 'await-to-js';
import find from 'lodash/find';
import unionBy from 'lodash/unionBy';
import { useQuery } from 'react-query';

function ProductBuyButtonLeftInStock({ payload, selectedVariant, isTouched, allOptionsSelected }) {
  const { useEffect, useState } = wp.element;
  const [quantityLeft, setQuantityLeft] = useState(false);
  const [status, setStatus] = useState('idle');
  const [variantInventory, setVariantInventory] = useState(false);
  const isMounted = useIsMounted();

  const inventoryQuery = useQuery(
    'inventory',
    () => {
      return getVariantInventoryManagement({ ids: getVariantIds(payload) });
    },
    {
      enabled: isTouched && status === 'idle',
      onError: (error) => {
        setStatus('error');
      },
      onSuccess: (response) => {
        console.log('prefetch onSuccess', response);
        setStatus('resolved');

        var variantInventoryResp = sanitizeInventoryResponse(response);
        // var combinedInventoryData = unionBy(variantInventoryResp, cachedInventory, 'id');

        // setCache('wps-inventory-levels', JSON.stringify(combinedInventoryData));

        setVariantInventory(variantInventoryResp);
      },
    }
  );

  useEffect(() => {
    if (!isMounted.current || !selectedVariant) {
      setQuantityLeft(false);
      return;
    }

    if (selectedVariant.availableForSale) {
      var totalAvailableQuantity = findTotalInventoryQuantity(variantInventory, selectedVariant.id);

      if (!totalAvailableQuantity) {
        setQuantityLeft(false);
      }

      setQuantityLeft(totalAvailableQuantity);
    }
  }, [selectedVariant]);

  function getVariantIds(payload) {
    if (!payload.variants) {
      return [];
    }

    return payload.variants.map((v) => v.id);
  }

  function sanitizeInventoryResponse(response) {
    return response.data.map((variant) => {
      if (!variant) {
        return false;
      }

      return {
        id: btoa(variant.id),
        tracked: variant.inventoryItem.tracked,
        inventoryLevels: variant.inventoryItem.inventoryLevels.edges,
        inventoryPolicy: variant.inventoryPolicy,
      };
    });
  }

  function findNonCachedVariants(cachedInventory, variantIDs) {
    return variantIDs.filter((variantId) => {
      return !find(cachedInventory, ['id', variantId]);
    });
  }

  //   async function fetchVariantInventoryManagement() {
  //     var cachedInventory = getCache('wps-inventory-levels');
  //     console.log('cachedInventory', cachedInventory);

  //     var variantIDs = getVariantIds(payload);

  //     if (!variantIDs.length) {
  //       console.warn('WP Shopify warning: No variant ids found for fetchVariantInventoryManagement');
  //       return;
  //     }

  //     if (cachedInventory) {
  //       cachedInventory = JSON.parse(cachedInventory);

  //       var variantIDs = findNonCachedVariants(cachedInventory, variantIDs);

  //       // Everything is cached, lets go
  //       if (!variantIDs.length) {
  //         setStatus('resolved');
  //         setVariantInventory(cachedInventory);
  //         return;
  //       }
  //     }

  //     setStatus('pending');

  //     const [error, response] = await to(getVariantInventoryManagement({ ids: variantIDs }));

  //     if (isMounted.current) {
  //       if (error || response.data.type === 'error') {
  //         setStatus('error');

  //         if (error) {
  //           console.error('WP Shopify JS error: ', error);
  //         }

  //         console.error('WP Shopify error: ', response);

  //         return;
  //       }

  //       setStatus('resolved');

  //       var variantInventoryResp = sanitizeInventoryResponse(response);
  //       var combinedInventoryData = unionBy(variantInventoryResp, cachedInventory, 'id');

  //       setCache('wps-inventory-levels', JSON.stringify(combinedInventoryData));

  //       setVariantInventory(variantInventoryResp);
  //     }
  //   }

  return (
    quantityLeft && allOptionsSelected && <ProductBuyButtonTextNotice quantityLeft={quantityLeft} />
  );
}

export default ProductBuyButtonLeftInStock;
