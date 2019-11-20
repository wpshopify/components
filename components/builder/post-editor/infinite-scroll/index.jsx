import React, { useContext } from "react"
import { ToggleControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function InfiniteScroll() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "infiniteScroll", value: newVal }
    })
  }

  return (
    <ToggleControl
      label="Infinite scroll?"
      checked={builderState.settings.infiniteScroll}
      onChange={onChange}
    />
  )
}

export { InfiniteScroll }
