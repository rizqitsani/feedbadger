import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function HomePage() {
  const { data: session } = useSession();

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
            {session && (
              <div className='flex gap-3 items-center mt-4 text-left'>
                {session?.user?.image && (
                  <NextImage
                    src={session?.user?.image}
                    height='100'
                    width='100'
                    className='overflow-hidden w-12 rounded-full'
                    alt='Photo of user'
                  />
                )}
                <div>
                  <p className='font-medium text-gray-800'>
                    {session?.user?.name}
                  </p>
                  <p className='small text-gray-700'>{session?.user?.email}</p>
                </div>
              </div>
            )}

            <nav className='mt-6'>
              <ul className='space-y-2'>
                {!session ? (
                  <li>
                    <ArrowLink href='/login'>Login</ArrowLink>
                  </li>
                ) : (
                  <button onClick={() => signOut()}>Logout</button>
                )}
                <li>
                  <ArrowLink href='/website/create'>Create Website</ArrowLink>
                </li>
                <li>
                  <ArrowLink href='/website'>See Website</ArrowLink>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}
