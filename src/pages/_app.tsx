import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';

import axiosClient from '@/lib/axios';

import DismissableToast from '@/components/DismissableToast';
import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Layout>
      <DismissableToast />

      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url).then((res) => res.data),
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </Layout>
  );
}

export default MyApp;
