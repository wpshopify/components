import React from "react"
import { getItemLink, singleIsShopify } from "../../common/settings"

function Link({
  type,
  payload,
  classNames = "",
  target,
  shopInfo,
  children,
  linkTo,
  manualLink,
  disableLink
}) {
  const className = "wps-" + type + "-link" + " " + classNames

  function getTarget(target) {
    if (target) {
      return target
    }

    if (singleIsShopify()) {
      return "_blank"
    } else {
      return "_self"
    }
  }

  return (
    <>
      {disableLink ? (
        children
      ) : (
        <a
          href={
            manualLink
              ? manualLink
              : getItemLink(payload, shopInfo, type, linkTo)
          }
          className={className}
          target={getTarget(target)}
        >
          {children}
        </a>
      )}
    </>
  )
}

export { Link }
