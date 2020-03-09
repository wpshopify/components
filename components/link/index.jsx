import { getItemLink, singleIsShopify } from '../../common/settings'

function Link({
  type,
  payload,
  classNames = '',
  target,
  shopInfo,
  children,
  linkTo,
  manualLink,
  disableLink
}) {
  const className = 'wps-' + type + '-link' + ' ' + classNames

  function getTarget(target) {
    if (target) {
      return target
    }

    // Fallback in case we forget to pass target to <Link>
    return '_blank'
  }

  return (
    <>
      {disableLink || linkTo === 'none' ? (
        children
      ) : (
        <a
          href={manualLink ? manualLink : getItemLink(payload, shopInfo, type, linkTo)}
          className={className}
          target={getTarget(target)}>
          {children}
        </a>
      )}
    </>
  )
}

export { Link }
