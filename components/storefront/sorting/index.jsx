import React, { useContext, useState } from "react"
import { StorefrontContext } from "../_state/context"
import { ItemsContext } from "../../items/_state/context"
import { usePortal } from "../../../common/hooks"

function getSelectedOption(select) {
  return select.options[select.selectedIndex]
}

function hasReverse(select) {
  var selectedOption = getSelectedOption(select)

  return selectedOption.hasAttribute("data-wps-reverse")
}

function StorefrontSorting() {
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)
  const [itemsState, itemsDispatch] = useContext(ItemsContext)

  const [sortValue, setSortValue] = useState(
    storefrontState.componentOptions.sortBy
  )

  function updateFetchParams(event) {
    let reverse = false

    if (hasReverse(event.target)) {
      reverse = true
    }

    let sortKey = event.target.value

    if (sortKey.includes("-REVERSE")) {
      sortKey = sortKey.replace("-REVERSE", "")
    }

    return {
      reverse: reverse,
      sortKey: sortKey
    }
  }

  function onChange(event) {
    setSortValue(event.target.value)

    itemsDispatch({
      type: "SET_QUERY_PARAMS",
      payload: updateFetchParams(event)
    })
  }

  return usePortal(
    <div className="wps-component wps-component-sorting">
      <label className="wps-sorting-heading wps-mr-2" htmlFor="wps-sorting">
        Sort by:
      </label>

      <select
        value={sortValue}
        id="wps-sorting"
        onChange={onChange}
        disabled={itemsState.isLoading}
      >
        <option value="DEFAULT" disabled="disabled">
          Choose an option
        </option>
        <option value="PRICE">Price (Low to high)</option>
        <option value="PRICE-REVERSE" data-wps-reverse>
          Price (High to low)
        </option>
        <option value="CREATED_AT" data-wps-reverse>
          New Arrival
        </option>
        <option value="BEST_SELLING">Best Selling</option>
        <option value="TITLE">Title (A-Z)</option>
        <option value="TITLE-REVERSE" data-wps-reverse>
          Title (Z-A)
        </option>
      </select>
    </div>,
    document.querySelector(storefrontState.componentOptions.dropzoneSorting)
  )
}

export { StorefrontSorting }
