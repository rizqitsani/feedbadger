import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <h1 className='mt-4'>FeedBadger</h1>
            <p className='mt-2 text-sm text-gray-800'>
              Open source, self-host feedback collector
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
