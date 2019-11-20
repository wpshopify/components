import React, { useContext, useState, useEffect } from "react"
import { ToggleControl, TextControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function Limit() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [limitToggle, setLimitToggle] = useState(false)
  const [localVal, setLocalVal] = useState(
    builderState.settings.limit ? builderState.settings.limit : false
  )

  function onChange() {
    setLimitToggle(!limitToggle)
  }

  function onLimitChange(newVal) {
    setLocalVal(newVal)
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "limit", value: parseInt(newVal) }
    })
  }

  useEffect(() => {
    setLocalVal(builderState.settings.limit)

    if (!builderState.settings.limit) {
      setLimitToggle(false)
    }
  }, [builderState.settings.limit])

  return (
    <>
      <ToggleControl label="Limit?" checked={limitToggle} onChange={onChange} />
      {limitToggle && (
        <TextControl
          label="Limit"
          value={localVal}
          onChange={onLimitChange}
          type="number"
          help="Limits the overall output"
        />
      )}
    </>
  )
}

export { Limit }
