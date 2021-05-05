import LinkModal from '../link-modal';
import LinkNormal from '../link-normal';

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
  function renderLink() {
    if (disableLink) {
      return children;
    }

    if (linkTo === 'none' && !manualLink) {
      return children;
    }

    if (linkTo === 'modal') {
      return <LinkModal>{children}</LinkModal>;
    }

    return (
      <LinkNormal
        type={type}
        payload={payload}
        linkTo={linkTo}
        manualLink={manualLink}
        target={target}
        classNames={classNames}>
        {children}
      </LinkNormal>
    );
  }

  return renderLink();
}

export default Link;
