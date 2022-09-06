import { css, Global } from '@emotion/react';
import {useState } from 'react';
import Header from './components/header';
import SideMenu from './components/side-menu';
import { Menu } from './models/menu';

/* Component props */
interface IProps {
  menus: Menu[];
  children: any;
}

// Component definition
export const SharedLayout = ({ menus, children }: IProps) => {
  /* Component states */
  const [currentMenu, setCurrentMenu] = useState<Menu>();
  const [currentApplication] = useState('eShop');

  /* Variables */
  const currentDate: Date = new Date();
  const formattedDate = `${currentDate.toLocaleString('en-us', {
    month: 'short',
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  /* Hooks */


  /* Event handlers */
  function handleClick(menu: Menu) {
    setCurrentMenu(menu);
  }
  return (
    <div className="text-gray-900">
      {/*Global css style for the navigation  */}
      <Global
        styles={css`
          .nav-item:hover {
            background-color: #f0fdfa;
            border-right: 1px solid #0f766e;
          }
          .nav-item .side-menu {
            display: none;
          }

          .nav-item:hover .side-menu {
            display: block;
          }
        `}
      />
      <div className="flex bg-gray-50 text-sm">
        {/* Side Nav */}
        <SideMenu menus={menus} setMenu={handleClick} />

        <div className="flex-1" style={{ minHeight: '100vh' }}>
          <Header />
          {/* Body */}
          <div className="py-2 px-4">
            {/*  Page Title and Breadcrumb */}
            <div className="flex">
              <div className="flex-1">
                {/* Page title */}
                <div className="text-sm font-semibold">{currentMenu?.name}</div>
                {/* Breadcrumb */}
                <div className="text-xs text-primary">
                  {currentApplication} / {currentMenu?.name}
                </div>
              </div>
              <div className="flex flex-auto justify-end">
                {/* Current time */}
                <span className="mr-2">Today is {formattedDate}</span>
              </div>

              {/* Content */}
            </div>
            <div className="py-2">{children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SharedLayout;
