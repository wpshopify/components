import React, { useContext } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function Pagination() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "pagination", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Show pagination"
      checked={builderState.settings.pagination}
      onChange={onChange}
    />
  )
}

export { Pagination }
