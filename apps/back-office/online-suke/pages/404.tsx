import { Button } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons';
import Head from 'next/head';
import Link from 'next/link';
export default function PageNotfound() {
  return (
    <>
      <Head>
        <title>Page not found - eShope</title>
        <meta name="description" content="page not found" />
      </Head>
      <div
        className="mx-auto mt-6 flex h-screen w-full items-center  justify-center"
      >
        <div className="mx-auto rounded-md ">
          <div className="flex flex-col items-center">
            <h1 className="text-9xl font-bold text-red-500">404</h1>

            <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 ">
              <span className="text-red-500">Oops!</span> Page not found
            </h6>

            <p className="mb-8 text-center text-gray-500">
              The page you{`'`}re looking for does{`'`}nt exist.
            </p>

            <Link href="/home" passHref>
              <Button
                size="sm"
                leftIcon={<IconArrowBack />}
                className="bg-primary px-6 py-2 font-bold
                 text-white hover:bg-primary no-underline hover:no-underline"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
