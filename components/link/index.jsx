import { getItemLink } from '../../common/settings'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Link({
  type,
  payload,
  classNames = '',
  target,
  children,
  linkTo = 'none',
  manualLink,
  disableLink,
}) {
  const className = 'wps-' + type + '-link' + ' ' + classNames

  const linkCSS = css`
    text-decoration: none;
    display: block;

    .wps-product-image {
      &:hover {
        cursor: pointer;
      }
    }
  `

  function getTarget(target) {
    if (target) {
      return target
    }

    // Fallback in case we forget to pass target to <Link>
    return '_blank'
  }

  return (
    <>
      {!manualLink && (disableLink || linkTo) === 'none' ? (
        children
      ) : (
        <a
          href={wp.hooks.applyFilters(
            'misc.link.href',
            manualLink ? encodeURI(manualLink) : getItemLink(payload, type, linkTo),
            type
          )}
          className={className}
          css={linkCSS}
          target={wp.hooks.applyFilters('misc.link.target', getTarget(target), type, payload)}>
          {children}
        </a>
      )}
    </>
  )
}

export { Link }
