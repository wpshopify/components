import React, { useContext, useState, useEffect, useRef } from "react"
import { FontSizePicker, BaseControl } from "@wordpress/components"
import { BuilderContext } from "../../_state/context"
import { __ } from "@wordpress/i18n"
import { useDebounce } from "use-debounce"

function TitleSize() {
  const [builderState, builderDispatch] = useContext(BuilderContext)
  const [localVal, setLocalVal] = useState(getDefaultVal())
  const [debouncedValue] = useDebounce(localVal, 10)
  const isFirstRender = useRef(true)

  const fontSizes = [
    {
      name: "Small",
      slug: "small",
      size: 18
    },
    {
      name: "Medium",
      slug: "medium",
      size: 22
    },
    {
      name: "Big",
      slug: "big",
      size: 28
    }
  ]

  function getDefaultVal() {
    if (!builderState.settings.titleSize) {
      return 22
    }

    var split = builderState.settings.titleSize.split("px")

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
        key: "titleSize",
        value: debouncedValue + "px"
      }
    })
  }, [debouncedValue])

  useEffect(() => {
    setLocalVal(getDefaultVal())
  }, [builderState.settings.titleSize])

  return (
    <BaseControl>
      <FontSizePicker
        fontSizes={fontSizes}
        value={getDefaultVal()}
        fallbackFontSize={22}
        withSlider={true}
        onChange={onChange}
      />
    </BaseControl>
  )
}

export { TitleSize }
