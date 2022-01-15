import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

type CreateWebsiteForm = {
  name: string;
  url: string;
};

export default function CreateWebsitePage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.replace('/login');
  }

  //#region  //*=========== Form ===========
  const methods = useForm<CreateWebsiteForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<CreateWebsiteForm> = (data) => {
    toast.promise(
      axiosClient.post('/api/website/create', data).then(() => {
        router.push('/website');
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
      }
    );
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout>
      <Seo templateTitle='CreateWebsite' />

      <main>
        <section className=''>
          <div className='layout py-20 min-h-screen'>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-3 max-w-sm'
              >
                <Input
                  id='name'
                  label='Name'
                  placeholder='FeedBadger'
                  validation={{ required: 'Name must be filled' }}
                />
                <Input
                  id='url'
                  label='Website URL'
                  placeholder='https://feedbadger.vercel.app'
                  validation={{ required: 'Website URL must be filled' }}
                />

                <Button type='submit'>Submit</Button>
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </Layout>
  );
}
