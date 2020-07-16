import { ProductBuyButtonTextNotice } from '../notice'
import { findTotalInventoryQuantity } from '../../../../../common/variants'
import {
  getVariantInventoryManagement,
  setCache,
  getCache,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { useIsMounted } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'
import to from 'await-to-js'
import find from 'lodash/find'
import unionBy from 'lodash/unionBy'

function ProductBuyButtonLeftInStock({ payload, selectedVariant, isTouched }) {
  const { useEffect, useState } = wp.element
  const [quantityLeft, setQuantityLeft] = useState(false)
  const [status, setStatus] = useState('idle')
  const [variantInventory, setVariantInventory] = useState(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (!isMounted.current) {
      return
    }
    if (isTouched && status === 'idle') {
      fetchVariantInventoryManagement()
    }
  }, [isTouched])

  function getVariantIds(payload) {
    if (!payload.variants) {
      return []
    }

    return payload.variants.map((v) => v.id)
  }

  function sanitizeInventoryResponse(response) {
    return response.data.map((variant) => {
      return {
        id: btoa(variant.id),
        tracked: variant.inventoryItem.tracked,
        inventoryLevels: variant.inventoryItem.inventoryLevels.edges,
        inventoryPolicy: variant.inventoryPolicy,
      }
    })
  }

  function findNonCachedVariants(cachedInventory, variantIDs) {
    return variantIDs.filter((variantId) => {
      return !find(cachedInventory, ['id', variantId])
    })
  }

  async function fetchVariantInventoryManagement() {
    var cachedInventory = getCache('wps-inventory-levels')
    var variantIDs = getVariantIds(payload)

    if (!variantIDs.length) {
      console.warn('WP Shopify warning: No variant ids found for fetchVariantInventoryManagement')
      return
    }

    if (cachedInventory) {
      cachedInventory = JSON.parse(cachedInventory)

      var variantIDs = findNonCachedVariants(cachedInventory, variantIDs)

      // Everything is cached, lets go
      if (!variantIDs.length) {
        setStatus('resolved')
        setVariantInventory(cachedInventory)
        return
      }
    }

    setStatus('pending')

    const [error, response] = await to(getVariantInventoryManagement({ ids: variantIDs }))

    if (isMounted.current) {
      if (error || response.data.type === 'error') {
        setStatus('error')

        if (error) {
          console.error('WP Shopify JS error: ', error)
        }

        console.error('WP Shopify error: ', response.data.message)

        return
      }

      setStatus('resolved')

      var variantInventoryResp = sanitizeInventoryResponse(response)
      var combinedInventoryData = unionBy(variantInventoryResp, cachedInventory, 'id')

      setCache('wps-inventory-levels', JSON.stringify(combinedInventoryData))

      setVariantInventory(variantInventoryResp)
    }
  }

  useEffect(() => {
    if (!isMounted.current || !selectedVariant) {
      return
    }

    if (selectedVariant.availableForSale) {
      var totalAvailableQuantity = findTotalInventoryQuantity(variantInventory, selectedVariant.id)

      if (!totalAvailableQuantity) {
        return
      }

      setQuantityLeft(totalAvailableQuantity)
    }
  }, [selectedVariant])

  return quantityLeft && <ProductBuyButtonTextNotice quantityLeft={quantityLeft} />
}

export default ProductBuyButtonLeftInStock
