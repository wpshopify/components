import React, { useContext, useState, useEffect, useRef } from "react"
import { FontSizePicker, BaseControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { __ } from "@wordpress/i18n"
import { useDebounce } from "use-debounce"

function DescriptionSize() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(getDefaultVal())
  const [debouncedValue] = useDebounce(localVal, 10)
  const isFirstRender = useRef(true)

  const fontSizes = [
    {
      name: "Small",
      slug: "small",
      size: 16
    },
    {
      name: "Medium",
      slug: "medium",
      size: 20
    },
    {
      name: "Big",
      slug: "big",
      size: 28
    }
  ]

  function getDefaultVal() {
    if (!builderState.settings.descriptionSize) {
      return 16
    }

    var split = builderState.settings.descriptionSize.split("px")

    return parseInt(split[0])
  }

  function onChange(newFontSize) {
    setLocalVal(newFontSize)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    builderDispatch({
      type: "UPDATE_SETTING",
      payload: {
        key: "descriptionSize",
        value: debouncedValue + "px"
      }
    })
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(getDefaultVal())
  }, [builderState.settings.descriptionSize])

  return (
    <BaseControl>
      <FontSizePicker
        fontSizes={fontSizes}
        value={getDefaultVal()}
        fallbackFontSize={16}
        withSlider={true}
        onChange={onChange}
      />
    </BaseControl>
  )
}

export { DescriptionSize }
