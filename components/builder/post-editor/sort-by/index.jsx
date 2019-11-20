import React, { useContext } from "react"
import { SelectControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function SortBy() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  const options = [
    { label: "Title", value: "title" },
    { label: "Vendor", value: "vendor" },
    { label: "ID", value: "id" },
    { label: "Price", value: "price" },
    { label: "Best selling", value: "best_selling" },
    { label: "Product type", value: "product_type" },
    { label: "Created at", value: "created_at" },
    { label: "Updated at", value: "updated_at" }
  ]

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "sortBy", value: newVal }
    })
  }

  return (
    <SelectControl
      label="Sort by"
      value={builderState.settings.sortBy}
      options={options}
      onChange={onChange}
    />
  )
}

export { SortBy }
