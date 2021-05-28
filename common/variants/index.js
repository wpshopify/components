import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import find from 'lodash/find';

function onlyAvailableVariantsOptions(variants) {
  return groupBy(
    flatMap(variants, (variant) => variant.selectedOptions),
    'name'
  );
}

function onlyUniqueOptionValues(optionValues) {
  return uniqBy(optionValues, 'value').filter((item) => item.value);
}

function formatAvailableOptions(availOptions) {
  return map(availOptions, (optionValues, optionName) => {
    return {
      name: optionName,
      values: onlyUniqueOptionValues(optionValues),
    };
  });
}

function filterOnlyAvailableVariants(variants) {
  return filter(variants, (v) => v.availableForSale);
}

function onlyAvailableOptionsFromVariants(variants) {
  if (!variants.length) {
    return false;
  }

  const showOutOfStockVariants = wp.hooks.applyFilters(
    'products.showOutOfStockVariants',
    false,
    variants
  );

  if (showOutOfStockVariants) {
    var onlyAvailableVariants = variants;
  } else {
    var onlyAvailableVariants = filterOnlyAvailableVariants(variants);
  }

  var groups = onlyAvailableVariantsOptions(onlyAvailableVariants);
  var finalOptions = formatAvailableOptions(groups);

  return finalOptions;
}

function findSelectedVariant(variantInventory, selectedVariantId) {
  return find(variantInventory, { id: selectedVariantId });
}

function findTotalInventoryQuantity(inventory, variantId) {
  let selectedVariantFound = findSelectedVariant(inventory, variantId);

  if (!selectedVariantFound) {
    console.warn(
      'WP Shopify warning: could not find selected variant for findTotalInventoryQuantity()'
    );
    return false;
  }

  if (!selectedVariantFound.tracked) {
    return false;
  }

  if (selectedVariantFound.inventoryPolicy === 'CONTINUE') {
    return false;
  }

  var totalAvailableQuantity = findInventoryFromVariantId(inventory, selectedVariantFound);

  if (!totalAvailableQuantity) {
    return false;
  }

  return totalAvailableQuantity;
}

function findInventoryFromVariantId(inventory, selectedVariant) {
  if (!inventory) {
    return false;
  }

  let totalAvailableQuantity = findAvailableQuantityByLocations(selectedVariant);
  let leftInStockTotal = parseInt(wp.hooks.applyFilters('misc.inventory.leftInStock.total', 10));

  if (totalAvailableQuantity === false || leftInStockTotal === false) {
    return false;
  }

  if (totalAvailableQuantity > 0 && totalAvailableQuantity < leftInStockTotal) {
    return totalAvailableQuantity;
  } else {
    return false;
  }
}

function findAvailableQuantityByLocations(variant) {
  console.log('---- variant.inventoryLevels', variant.inventoryLevels);

  if (!variant || !variant.inventoryLevels || !variant.inventoryLevels.hasOwnProperty('edges')) {
    return false;
  }

  if (variant.inventoryLevels.edges.length === 0) {
    return false;
  }

  if (variant.inventoryLevels.edges.length === 1) {
    return variant.inventoryLevels.edges[0].node.available;
  }

  return variant.inventoryLevels.edges.reduce((accumulator, currentValue) => {
    if (!accumulator.node) {
      return accumulator;
    }

    return accumulator.node.available + currentValue.node.available;
  });
}

export {
  onlyAvailableOptionsFromVariants,
  filterOnlyAvailableVariants,
  findSelectedVariant,
  findTotalInventoryQuantity,
};
