import { getItemLink, liteSyncAndWordPressLink } from '../../common/settings'

function Link({
  type,
  payload,
  classNames = '',
  target,
  children,
  linkTo,
  manualLink,
  disableLink,
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
      {disableLink || linkTo === 'none' || liteSyncAndWordPressLink(linkTo) ? (
        children
      ) : (
        <a
          href={manualLink ? manualLink : getItemLink(payload, type, linkTo)}
          className={className}
          target={wp.hooks.applyFilters('misc.link.target', getTarget(target), type, payload)}>
          {children}
        </a>
      )}
    </>
  )
}

export { Link }
