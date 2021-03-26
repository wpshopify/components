import { Notice } from '../notices';

function ErrorFallback({ error = '' }) {
  return (
    <Notice status='error' isDismissible={false}>
      {wp.i18n.__(
        'Uh oh something went wrong. Please reload the page and try again. ',
        'wpshopify'
      )}
      {error.message}
    </Notice>
  );
}

export default ErrorFallback;
