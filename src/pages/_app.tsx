import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
