import React, { useContext, useState, useEffect } from "react"
import { RadioControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function Connective() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(builderState.settings.connective)

  function onChange(newVal) {
    setLocalVal(newVal)
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "connective", value: newVal }
    })
  }

  useEffect(() => {
    setLocalVal(builderState.settings.connective)
  }, [builderState.settings.connective])

  return (
    <RadioControl
      label="Connective"
      help="Determines whether to search for any match, or a group match. Default is AND"
      selected={localVal}
      options={[
        { label: "AND", value: "AND" },
        { label: "OR", value: "OR" }
      ]}
      onChange={onChange}
    />
  )
}

export { Connective }
