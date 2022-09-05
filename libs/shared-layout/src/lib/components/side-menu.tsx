/* eslint-disable array-callback-return */
import * as Icon from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Menu } from '../models/menu';
import PopMenu from './pop-menu';

interface Props {
  menus: Menu[];
  setMenu: any;
}
const SideMenu = (props: Props) => {
  const router = useRouter();
  const menus: Menu[] = props.menus;
  const [navToggle, setNavToggler] = useState<boolean>(true);
  const [currentMenu, setCurrentMenu] = useState<Menu>();
  const [currentSubMenu, setCurrentSubMenu] = useState<Menu>();
  const [baseUrl, setBaseUrl] = useState<string>();
  useEffect(() => {
    setBaseUrl(window.location.origin.toString());
  }, []);
  useEffect(() => {
    menus.map((menu) => {
      const regex = new RegExp('^\\/' + menu?.key + '*');
      if (regex.test(router.pathname) && currentMenu !== menu) {
        setCurrentMenu(menu);
        if (menu.subMenus?.length === 0 || menu.subMenus === undefined) {
          setCurrentSubMenu(undefined);
        }
        props.setMenu(menu);
      }
    });
  }, [router]);

  function handleClick(menu: Menu) {
    setCurrentMenu(menu);
    props.setMenu(menu);
  }

  function handleToggle() {
    setNavToggler((prev) => !prev);
  }

  function iconTag(ICustom: Icon.TablerIcon, color: string) {
    return <ICustom size={24} strokeWidth={1.25} color={color} />;
  }

  function menuTab(menu: Menu) {
    return (
      <div
        key={menu.key}
        className={
          currentMenu === menu
            ? navToggle == true
              ? 'bg-primary-50'
              : 'nav-item relative'
            : 'nav-item relative'
        }
      >
        <Link
          href={
            menu.isApp
              ? `${baseUrl}/${menu.key}${
                  menu.subMenus?.length !== 0 && menu.subMenus !== undefined
                    ? `/${menu.subMenus![0].key}`
                    : ''
                }`
              : `/${menu.key}${
                  menu.subMenus?.length !== 0 && menu.subMenus !== undefined
                    ? `/${menu.subMenus![0].key}`
                    : ''
                }`
          }
          passHref
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            id={menu.key}
            onClick={() => handleClick(menu)}
            className={`flex items-center py-2 px-4 ${
              currentMenu?.key === menu?.key
                ? 'border-r-2 border-primary bg-primary text-white'
                : 'hover:border-r-2 hover:border-primary hover:bg-primary-50'
            }`}
          >
            <div>
              {iconTag(
                menu.icon,
                currentMenu?.key === menu?.key ? 'white' : 'black'
              )}
            </div>
            {navToggle && <div className="pl-2">{menu.name}</div>}
          </a>
        </Link>
        {menu.subMenus?.length != undefined && menu.subMenus !== undefined && (
          <PopMenu
            onSelect={(subMenu: Menu) => {
              setCurrentMenu(menu);
              setCurrentSubMenu(subMenu);
            }}
            menu={menu}
            currentMenu={currentMenu}
            currentSubMenu={currentSubMenu}
            navToggle={navToggle}
          />
        )}
      </div>
    );
  }

  return (
    <nav
      className="border-r bg-white"
      style={{ width: navToggle ? '220px' : '62px' }}
    >
      {/* Top Header (ICON and Name) */}
      <div
        className="flex items-center bg-primary px-2 text-white"
        style={{
          marginRight: '-1px',
          padding: '14px',
        }}
      >
        <Link href={""}>
          <a className="flex">
            <div>
              <Icon.IconBasket
                onClick={handleToggle}
                size={32}
                strokeWidth={1.5}
                color={'white'}
              />
            </div>
            {navToggle && (
              <div className="hidden items-center pl-2 text-xl font-semibold md:inline">
                eShope
              </div>
            )}
          </a>
        </Link>
      </div>

      {/* menus */}
      <aside className="mt-4">{menus.map((menu) => menuTab(menu))}</aside>
      <div
        className="fixed bottom-0 flex items-center border-r border-t bg-white py-2 px-2 hover:bg-gray-100"
        style={{ width: navToggle ? '220px' : '62px' }}
        onClick={handleToggle}
      >
        <div className="flex flex-grow px-1 hover:cursor-pointer">
          {navToggle && <div className="pl-2">Collapse</div>}
        </div>
        {navToggle ? (
          <Icon.IconChevronsRight size={24} className="hover:cursor-pointer" strokeWidth={1.5} color={'black'} />
        ) : (
          <Icon.IconChevronsLeft size={24} className="hover:cursor-pointer" strokeWidth={1.5} color={'black'} />
        )}
      </div>
    </nav>
  );
};
export default SideMenu;
