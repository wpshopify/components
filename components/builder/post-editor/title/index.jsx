import React, { useContext, useState, useRef, useEffect } from "react"
import { TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { convertValuesToString, removeEmptyValues } from "../../_common"
import { useDebounce } from "use-debounce"

function Title() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(savedVal())
  const [debouncedValue] = useDebounce(localVal, 400)
  const isFirstRender = useRef(true)

  function savedVal() {
    return convertValuesToString(builderState.settings.title)
  }

  function onChange(newVal) {
    setLocalVal(newVal)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (localVal !== savedVal()) {
      builderDispatch({
        type: "UPDATE_SETTING",
        payload: { key: "title", value: removeEmptyValues(localVal) }
      })
    }
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(savedVal())
  }, [builderState.settings.title])

  return (
    <TextControl
      label="Title"
      value={localVal}
      help="Match product titles. Separate multiple by comma."
      onChange={onChange}
    />
  )
}

export { Title }
