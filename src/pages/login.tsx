import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function LoginPage() {
  const { data: session, status } = useSession();

  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <h1>Testing login!</h1>

            <pre>{JSON.stringify(session, null, 2)}</pre>

            {status === 'unauthenticated' ? (
              <Button onClick={() => signIn('github', {})}>
                Sign in with github
              </Button>
            ) : (
              <Button onClick={() => signOut()}>Sign out</Button>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
