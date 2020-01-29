import React from "react"
import { BuilderProvider } from "./_state/provider"
import { BuilderWrapper } from "./wrapper"

function ShortcodeBuilder() {
  var defaultState = {}

  // defaultState goes into the BuilderProvider as an options={} prop

  return (
    <BuilderProvider>
      <BuilderWrapper />
    </BuilderProvider>
  )
}
export { ShortcodeBuilder }
