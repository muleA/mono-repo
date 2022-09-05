/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineProvider } from '@mantine/core';
import { Menu, SharedLayout } from '@shared-layout'
import * as Icon from '@tabler/icons';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/main.css';

const menus: Menu[] = [
  {
    name: 'Home',
    shortName: 'Home',
    key: 'home',
    icon: Icon.IconSmartHome,
    roles: [],
  },
  {
    name: 'Dashboard',
    shortName: 'Dashboard',
    key: 'dashboard',
    icon: Icon.IconDashboard,
    roles: [],
  },
  {
    name: 'Users',
    shortName: 'User',
    key: 'users',
    icon: Icon.IconUsers,
    roles: []
  },
  {
    name: 'Categories',
    shortName: 'Categories',
    key: 'categories',
    icon: Icon.IconCategory2,
    roles: []
  },
  {
    name: 'Products',
    shortName: 'products',
    key: 'products',
    icon: Icon.IconBrandProducthunt,
    roles: [],
  },
  {
    name: 'Orders',
    shortName: 'order',
    key: 'order',
    icon: Icon.IconGridPattern,
    roles: [],
  },
  {
    name: 'Archives',
    shortName: 'Archives',
    key: 'archives',
    icon: Icon.IconArchive,
    roles: [],
  },
];
function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>eShope</title>
      </Head>
      <MantineProvider
        theme={{
          colors: {
            blue: [
              '#EBF8FF',
              '#BEE3F8',
              '#90CDF4',
              '#63B3ED',
              '#4299E1',
              '#3182CE',
              '#2B6CB0',
              '#2C5282',
              '#115e59',
              '#2A4365',
            ],
          },
          primaryColor: 'blue',
        }}
      >
        <main className="app">
              <SharedLayout menus={menus}>
                <Component {...pageProps} />
              </SharedLayout>
        </main>
      </MantineProvider>
    </>
  );
}

export default CustomApp;
