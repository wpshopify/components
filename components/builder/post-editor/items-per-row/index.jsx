import React, { useContext, useState, useEffect, useRef } from "react"
import { RangeControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { useDebounce } from "use-debounce"

function ItemsPerRow() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(builderState.settings.itemsPerRow)
  const [debouncedValue] = useDebounce(localVal, 50)
  const isFirstRender = useRef(true)

  function onChange(newVal) {
    setLocalVal(newVal)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "itemsPerRow", value: debouncedValue }
    })
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(builderState.settings.itemsPerRow)
  }, [builderState.settings.itemsPerRow])

  return (
    <RangeControl
      label="Items per row"
      value={localVal}
      onChange={onChange}
      min={1}
      max={20}
    />
  )
}

export { ItemsPerRow }
