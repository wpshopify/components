import React, { useContext } from "react"
import { RadioControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"

function Connective() {
  const [builderState, builderDispatch] = useContext(BuilderContext)

  function onChange(newVal) {
    builderDispatch({
      type: "UPDATE_SETTING",
      payload: { key: "connective", value: newVal }
    })
  }

  return (
    <RadioControl
      label="Connective"
      help="Determines whether to search for any match, or a group match. Default is AND"
      selected={builderState.settings.connective}
      options={[
        { label: "AND", value: "AND" },
        { label: "OR", value: "OR" }
      ]}
      onChange={onChange}
    />
  )
}

export { Connective }
