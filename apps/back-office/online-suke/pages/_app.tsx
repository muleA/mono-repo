/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineProvider } from '@mantine/core';
import { Menu, SharedLayout } from '@shared-layout'
import * as Icon from '@tabler/icons';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/main.css';
import favicon from '../public/icons/favicon.ico';
import NextNProgress from 'nextjs-progressbar';

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
    key: 'users/list',
    icon: Icon.IconUsers,
    roles: []
  },
  {
    name: 'Categories',
    shortName: 'Categories',
    key: 'categories/list',
    icon: Icon.IconCategory2,
    roles: []
  },
  {
    name: 'Products',
    shortName: 'products',
    key: 'products/list',
    icon: Icon.IconBrandProducthunt,
    roles: [],
  },
  {
    name: 'Orders',
    shortName: 'order',
    key: 'orders/list',
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
  {
    name: 'Settings',
    shortName: 'Settings',
    key: 'settings',
    icon: Icon.IconSettings,
    roles: [],
  },
];
function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>eShope</title>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="welcome " />
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
              <NextNProgress
                      height={4}
                      color="#f0b70c"
                      options={{ easing: 'ease', speed: 500 }}
                      showOnShallow={true}
                    />
                <Component {...pageProps} />
              </SharedLayout>
        </main>
      </MantineProvider>
    </>
  );
}

export default CustomApp;
