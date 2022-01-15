import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import * as React from 'react';
import toast from 'react-hot-toast';

import { prisma } from '@/lib/prisma';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function SeeWebsitePage({
  websites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    toast.error('Please login first');
    router.replace('/login');
  }

  return (
    <Layout>
      <Seo templateTitle='SeeWebsite' />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <h1>Website list</h1>

            <div className='flex gap-3 items-center mt-4'>
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

            <div className='mt-12'>
              <h2 className='h3 font-medium'>List of websites:</h2>
              <ul className='mt-4 space-y-2'>
                {websites.map((website) => (
                  <li key={website.id}>
                    <h3 className='h4 font-medium'>{website.name}</h3>
                    <p className='small text-gray-600'>{website.url}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getSession({ req });
  if (!session || !session.user?.email) {
    res.statusCode = 403;
    return { props: { websites: [] } };
  }

  const websites = await prisma.website.findMany({
    where: {
      user: { email: session.user.email },
    },
  });

  return {
    props: { websites },
  };
};
