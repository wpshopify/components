import React, { useContext, useState, useRef, useEffect } from "react"
import { RangeControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { useDebounce } from "use-debounce"

function DescriptionLength() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(
    builderState.settings.descriptionLength
  )
  const [debouncedValue] = useDebounce(localVal, 10)
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
      payload: { key: "descriptionLength", value: debouncedValue }
    })
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(builderState.settings.descriptionLength)
  }, [builderState.settings.descriptionLength])

  return (
    <RangeControl
      label="Description Length"
      help=" Limits the number of characters"
      value={localVal}
      onChange={onChange}
      min={1}
      max={200}
    />
  )
}

export { DescriptionLength }
