import { ProductQuantity } from './quantity'
import { ProductOptions } from './options'
import { ProductAddButton } from './add-button'
import { ProductBuyButtonProvider } from './_state/provider'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { usePortal } from '../../../../common/hooks'
import { hasLink } from '../../../../common/settings'
import { findPortalElement, FilterHook } from '../../../../common/utils'
import { getVariantInventoryManagement } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import find from 'lodash/find'
const { Notice } = wp.components
const { useContext, useState, useEffect } = wp.element
const { __ } = wp.i18n

function ProductBuyButton() {
  const [status, setStatus] = useState('idle')
  const [lowSupply, setLowSupply] = useState(false)
  const [variantInventory, setVariantInventory] = useState(false)
  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)
  console.log('<ProductBuyButton>')

  function getVariantIds(items) {
    if (!items.length) {
      return []
    }

    return items.map((item) => item.variants.map((v) => v.id)).flat()
  }

  function sanitizeInventoryResponse(response) {
    return response.data.map((variant) => {
      console.log('((((((((((( variant', variant)

      return {
        id: btoa(variant.id),
        tracked: variant.inventoryItem.tracked,
        inventoryLevels: variant.inventoryItem.inventoryLevels.edges,
        inventoryPolicy: variant.inventoryPolicy,
      }
    })
  }
  // const vIds =
  // console.log('vIdsvIdsvIdsvIds', vIds)

  async function fetchVariantInventoryManagement() {
    const variantIs = getVariantIds(itemsState.payload)

    if (!variantIs.length) {
      console.warn('WP Shopify warning: No variant ids found for fetchVariantInventoryManagement')
      return
    }

    setStatus('pending')
    console.log('fetchVariantInventoryManagement')
    const [error, resp] = await to(getVariantInventoryManagement({ ids: variantIs }))

    if (error) {
      console.error('>>>>>>>>>>>>>>>>>  err', err)
      setStatus('error')
      return
    }

    console.log('........... resp', resp)

    var variantInventoryResp = sanitizeInventoryResponse(resp)
    console.log('HEY ', variantInventoryResp)

    setStatus('resolved')
    setVariantInventory(variantInventoryResp)
  }

  function findTotalAvailableQuantity(variant) {
    return variant.inventoryLevels.reduce((accumulator, currentValue) => {
      return accumulator.node.available + currentValue.node.available
    })
  }

  function findSelectedVariant(selectedVariantId) {
    return find(variantInventory, { id: selectedVariantId })
  }

  function onMouseEnter() {
    console.log('onMouseEnter')
    fetchVariantInventoryManagement()
  }

  useEffect(() => {
    console.log('<ProductBuyButton> productState.selectedVariant')
    if (!productState.selectedVariant) {
      return
    }

    if (productState.selectedVariant.availableForSale) {
      console.log('VARIANT AVAILABLE FOR SALE!!!!!', productState.selectedVariant)
      let selectedVariant = findSelectedVariant(productState.selectedVariant.id)
      console.log('asofkassssssss', selectedVariant)

      if (!selectedVariant) {
        console.warn('WP Shopify warning: could not find selectd variant within <ProductBuyButton>')
        return
      }

      if (!selectedVariant.tracked) {
        console.log('VARIANT NOT TRACKED -- RETURNING')
        return
      }

      console.log('selectedVariantselectedVariant', selectedVariant)

      if (selectedVariant.inventoryPolicy === 'CONTINUE') {
        console.log(
          'VARIANT Customers are allowed to place an order for the product variant when its out of stock. -- RETURNING'
        )
        return
      }

      var totalAvailableQuantity = findInventoryFromVariantId(
        productState.selectedVariant.id,
        selectedVariant
      )

      setLowSupply(totalAvailableQuantity)
    } else {
      console.log('VARIANT NOT AVAILABLE FOR SALE -- RETURNING')
      return
    }

    console.log('totalAvailableQuantity', totalAvailableQuantity)
  }, [productState.selectedVariant])

  function findInventoryFromVariantId(selectedVariantId, selectedVariant) {
    console.log('variantInventory', variantInventory)
    console.log('selectedVariantId ', selectedVariantId)

    if (!variantInventory) {
      return false
    }

    let totalAvailableQuantity = findTotalAvailableQuantity(selectedVariant)

    if (totalAvailableQuantity > 0 && totalAvailableQuantity < 10) {
      console.log('PRODUCT VARIANT HAS UP TO 9 ITEMS LEFT')
    } else {
      console.log('PRODUCT VARIANT available quanaity not in range', totalAvailableQuantity)
    }

    return totalAvailableQuantity
  }

  function LowSupplyNotice({ quantityLeft }) {
    return <div>Hurry! We only have {quantityLeft} left!</div>
  }

  return usePortal(
    <div
      className='wps-buy-button-wrapper'
      data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
      data-wps-component-order='0'
      onMouseEnter={status === 'idle' ? onMouseEnter : null}>
      <FilterHook
        name='before.product.buyButton'
        args={[productState]}
        isReady={shopState.isShopReady}
      />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {!itemsState.payloadSettings.hideQuantity && !hasLink(itemsState, shopState) && (
              <ProductQuantity />
            )}
            {productState.hasManyVariants && !hasLink(itemsState, shopState) && <ProductOptions />}

            <ProductAddButton />
          </>
        ) : (
          <FilterHook
            name='products.buyButton.unavailable.html'
            hasHTML={true}
            args={[productState]}>
            <Notice status='warning' isDismissible={false}>
              <FilterHook name='notice.unavailable.text'>
                {__('Out of stock', wpshopify.misc.textdomain)}
              </FilterHook>
            </Notice>
          </FilterHook>
        )}
      </ProductBuyButtonProvider>

      {lowSupply && <LowSupplyNotice quantityLeft={lowSupply} />}
      <FilterHook
        name='after.product.buyButton'
        args={[productState]}
        isReady={shopState.isShopReady}
      />
    </div>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductBuyButton)
  )
}

export default ProductBuyButton
