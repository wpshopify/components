import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import mapKeys from 'lodash/mapKeys';
import compact from 'lodash/compact';
import transform from 'lodash/transform';
import map from 'lodash/map';
import has from 'lodash/has';
import { filterObj } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';

function buildQueryStringFromSelections(selections, connective) {
  if (isEmpty(selections)) {
    return '*';
  }

  const normalizedSelects = normalizeKeysForShopifyQuery(selections);

  let newQuery = stringifyFilterTypes(
    combineFilterTypes(normalizedSelects, Object.keys(normalizedSelects), connective)
  );

  if (has(normalizedSelects, 'available_for_sale')) {
    if (!selections.available_for_sale) {
      newQuery += ' available_for_sale:false';
    } else {
      if (selections.available_for_sale[0] === true) {
        newQuery += ' available_for_sale:true';
      }
    }
  }

  if (newQuery === '') {
    newQuery = '*';
  }

  return newQuery;
}

/*

Annoying, but needs to be done to make the filter components easier to deal with

*/
function normalizeKeysForShopifyQuery(selections) {
  return mapKeys(selections, function (value, key) {
    if (key === 'tags') {
      return 'tag';
    }

    if (key === 'vendors') {
      return 'vendor';
    }

    if (key === 'types') {
      return 'product_type';
    }

    if (key === 'titles') {
      return 'title';
    }

    return key;
  });
}

function stringifyFilterTypes(filterTypes) {
  if (!filterTypes) {
    return '';
  }

  var joinedTypes = filterTypes.map(joinFilteredValues);

  if (isEmpty(joinedTypes)) {
    return '';
  }

  return joinedTypes.join(' ');
}

function combineFilterTypes(selections, filterTypes, connectiveValue) {
  return compact(
    filterTypes.map((filterType, index) => {
      if (filterType === 'available_for_sale') {
        return;
      }

      if (isEmpty(selections[filterType])) {
        return;
      }

      if (isString(selections[filterType])) {
        return filterType + ':' + '"' + selections[filterType] + '"';
      } else {
        return selections[filterType].map(function (value, i, arr) {
          if (arr.length - 1 !== i) {
            var connective = ' ' + connectiveValue.toUpperCase();
          } else {
            var connective = '';
          }

          return filterType + ':' + '"' + value + '"' + connective;
        });
      }
    })
  );
}

function joinFilteredValues(value) {
  if (isEmpty(value)) {
    return '';
  }

  if (isString(value)) {
    return value;
  }

  return value.join(' ');
}

function getInitialSelections(filterParams) {
  return transform(
    filterObj(filterParams),
    function (result, value, key) {
      if (key === 'productType') {
        key = 'types';
      } else {
        if (key === 'availableForSale') {
          key = 'available_for_sale';
          if (value === 'available' || value === 'any') {
            value = true;
          }
        } else {
          key = key + 's';
        }
      }

      if (isArray(value)) {
        return (result[key] = map(value, (val) => {
          if (isString(value)) {
            return val.toLowerCase();
          } else {
            return val;
          }
        }));
      } else {
        if (isString(value)) {
          return (result[key] = [value.toLowerCase()]);
        } else {
          return (result[key] = [value]);
        }
      }
    },
    {}
  );
}

export {
  joinFilteredValues,
  combineFilterTypes,
  stringifyFilterTypes,
  normalizeKeysForShopifyQuery,
  buildQueryStringFromSelections,
  getInitialSelections,
};
