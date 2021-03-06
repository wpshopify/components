import { ProductBuyButtonTextNotice } from '../notice';
import { findTotalInventoryQuantity } from '../../../../../common/variants';
import {
  getVariantInventoryManagement,
  setCache,
  getCache,
  queryOptionsNoRefetch,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';
import { findNonCachedVariants } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import unionBy from 'lodash/unionBy';
import has from 'lodash/has';
import useIsMounted from 'ismounted';
import { useQuery } from 'react-query';

function ProductBuyButtonLeftInStock({ payload, selectedVariant, isTouched, allOptionsSelected }) {
  const { useEffect, useState } = wp.element;
  const [quantityLeft, setQuantityLeft] = useState(false);
  const [status, setStatus] = useState('idle');
  const [variantInventory, setVariantInventory] = useState(false);
  const isMounted = useIsMounted();

  const inventoryQuery = useQuery(
    'inventory-' + payload.title,
    () => {
      var variantIDs = getVariantIds(payload);
      let cachedInventory = getCache('wps-inventory-levels');

      if (!variantIDs.length) {
        console.warn(
          'WP Shopify warning: No variant ids found for fetchVariantInventoryManagement'
        );
        return;
      }

      if (cachedInventory) {
        cachedInventory = JSON.parse(cachedInventory);

        var variantIDs = findNonCachedVariants(cachedInventory, variantIDs);

        // Everything is cached, lets go
        if (!variantIDs.length) {
          setStatus('resolved');
          setVariantInventory(cachedInventory);
          return Promise.resolve({ data: cachedInventory, cached: true });
        }
        
      }

      return getVariantInventoryManagement({ ids: getVariantIds(payload) });
    },
    {
      enabled: isTouched && status === 'idle',
      onError: (error) => {
        setStatus('error');
      },
      onSuccess: (response) => {
        setStatus('resolved');

        if (has(response, 'cached')) {
          return;
        }

        if (has(response, 'data')) {
          response = response.data;
        }

        let cachedInventory = getCache('wps-inventory-levels');

        if (cachedInventory) {
          cachedInventory = JSON.parse(cachedInventory);
        } else {
          cachedInventory = false;
        }

        var variantInventoryResp = sanitizeInventoryResponse(response);
        var combinedInventoryData = unionBy(variantInventoryResp, cachedInventory, 'id');

        setCache('wps-inventory-levels', JSON.stringify(combinedInventoryData));

        setVariantInventory(variantInventoryResp);
      },
      ...queryOptionsNoRefetch,
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
    if (!payload || !payload.variants) {
      return [];
    }

    return payload.variants.map((v) => v.id);
  }

  function sanitizeInventoryResponse(response) {
    if (has(response, 'data')) {
      var data = response.data;
    } else {
      var data = response;
    }

    if (!data) {
      return [];
    }

    return data.map((variant) => {
      if (!variant) {
        return false;
      }

      return {
        id: btoa(variant.id),
        tracked: has(variant, 'inventoryItem') ? variant.inventoryItem.tracked : false,
        inventoryLevels: has(variant, 'inventoryItem')
          ? variant.inventoryItem.inventoryLevels
          : false,
        inventoryPolicy: variant.inventoryPolicy,
      };
    });
  }

  return (
    quantityLeft && allOptionsSelected && <ProductBuyButtonTextNotice quantityLeft={quantityLeft} />
  );
}

export default ProductBuyButtonLeftInStock;
