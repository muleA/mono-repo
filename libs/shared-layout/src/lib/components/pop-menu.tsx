import * as Icon from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Menu } from '../models/menu';

interface IProps {
  menu: Menu;
  currentMenu: Menu | any;
  currentSubMenu: Menu | any;
  onSelect: any;
  navToggle: boolean;
}

const PopMenu = ({
  menu,
  currentMenu,
  onSelect,
  currentSubMenu,
  navToggle,
}: IProps) => {
  const router = useRouter();
  useEffect(() => {
    menu.subMenus?.map((subMenu) => {
      const regex = new RegExp('^\\/' + menu?.key + '\\/' + subMenu?.key + '*');
      if (regex.test(router.pathname) && currentSubMenu !== subMenu) {
        onSelect(subMenu);
      }
    });
  }, [router]);
  function iconTag(ICustom: Icon.TablerIcon, color: string) {
    return <ICustom size={24} strokeWidth={1.25} color={color} />;
  }

  function subMenuTab(subMenu: Menu) {
    return (
      <Link href={`/${menu.key}/${subMenu.key}`}>
        <a
          className={`flex items-center py-2 px-4 hover:cursor-pointer ${
            currentMenu?.key === menu?.key &&
            currentSubMenu?.key === subMenu?.key
              ? 'border-r-2 border-primary bg-primary-100'
              : 'hover:border-r-2 hover:border-primary-700 hover:bg-primary-50'
          }`}
          onClick={() => onSelect(subMenu)}
        >
          <div>{iconTag(subMenu.icon, 'black')}</div>
          <div className="pl-2">{subMenu.name}</div>
        </a>
      </Link>
    );
  }

  return (
    <div
      className={
        currentMenu === menu
          ? navToggle === true
            ? ''
            : 'side-menu absolute top-0 left-[100%] z-50 ml-[0.5px] w-[180px]'
          : 'side-menu absolute top-0 left-[100%] z-50 ml-[0.5px] w-[180px]'
      }
    >
      <div
        className={`border ${
          currentMenu !== menu ? 'bg-white' : navToggle === false && 'bg-white'
        } `}
      >
        {currentMenu !== menu && (
          <section>
            <header className="border-b p-2">
              <div className="font-semibold text-slate-900">{menu.name}</div>
            </header>
          </section>
        )}

        {currentMenu === menu && navToggle === false && (
          <section>
            <header className="border-b p-2">
              <div className="font-semibold text-slate-900">{menu.name}</div>
            </header>
          </section>
        )}

        <nav>
          {/* menu list */}
          {menu.subMenus?.map((menu) => {
            return (
              <div key={menu.key}>
                <div>{subMenuTab(menu)}</div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default PopMenu;
