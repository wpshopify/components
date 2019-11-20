import React, { useRef, useContext, useState, useEffect } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { useDebounce } from "use-debounce"

function NoResultsText() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(builderState.settings.noResultsText)
  const [debouncedValue] = useDebounce(localVal, 250)
  const isFirstRender = useRef(true)

  function onChange(newVal) {
    setLocalVal(newVal)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (localVal !== builderState.settings.noResultsText) {
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "noResultsText", value: localVal }
      })
    }
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(builderState.settings.noResultsText)
  }, [builderState.settings.noResultsText])

  return (
    <TextControl label="No results text" value={localVal} onChange={onChange} />
  )
}

export { NoResultsText }
