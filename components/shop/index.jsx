import { ShopProvider } from './_state/provider';
import { ShopBootstrap } from '../bootstrap';
import { GlobalNotices } from './notices';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import { ReactQueryDevtools } from 'react-query/devtools';

function Shop({ children }) {
  return (
    <ShopProvider>
      <QueryClientProvider client={queryClient}>
        <ShopBootstrap>{children}</ShopBootstrap>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
      <GlobalNotices />
    </ShopProvider>
  );
}

export { Shop };
