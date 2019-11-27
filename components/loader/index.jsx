import React from "react"
var LoaderSpinner = require("react-loaders").Loader
import { usePortal } from "../../common/hooks"

function Loader({ isLoading, dropzone, color }) {
  return usePortal(
    <div className="wps-loader-wrapper">
      <LoaderSpinner
        type="ball-pulse"
        color={color ? color : "#FFF"}
        innerClassName="wps-loader"
        active={isLoading}
      />
    </div>,
    document.querySelector(dropzone)
  )
}

export { Loader }
