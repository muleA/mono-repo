import { Avatar, Menu, Tooltip } from '@mantine/core';
import * as Icon from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import '../i18n';

/* Component definitions */
const Header = () => {
  /* hooks */
  const { t, i18n } = useTranslation();

  /* Variables */
  const languages: any = {
    en: 'English',
    am: 'አማርኛ',
  };

  /* useEffect hooks */


  /* Event handlers */
  const loadLanguage = async (language: string) => {
    try {
      if (!i18n.getDataByLanguage(language)) {
        const resource = await import(`../translations/${language}.json`);
        i18n.addResourceBundle(language, 'translation', resource);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeLanguage = (language: string) => {
    loadLanguage(language).then(() => i18n.changeLanguage(language));
  };

  return (
    <div
      className="flex justify-between border-b bg-primary px-4"
      style={{
        padding: '10px',
      }}
    >
      <div className='flex'>

      </div>

      {/* Right side menu */}
      <div className="flex items-center justify-end text-white">
        {/* Language */}
        <Menu
          position="bottom"
          placement="end"
          delay={100}
          control={
            <div className="flex items-center px-1">
              {languages[i18n.language]}
              <span className="inline-block">
                <Icon.IconChevronDown size={20} strokeWidth={1.5} />
              </span>
            </div>
          }
          styles={{
            itemHovered: { backgroundColor: 'rgb(229 231 235) !important' },
          }}
        >
          {Object.keys(languages)
            .filter((key) => key !== i18n.language)
            .map((key) => {
              return (
                <Menu.Item onClick={() => changeLanguage(key)} key={key}>
                  {languages[key]}
                </Menu.Item>
              );
            })}
        </Menu>

        {/* help */}
        <div className="items-center px-1">
          <Icon.IconHelp size={20} strokeWidth={1.5} />
        </div>
        {/* notification */}
        <div className="px-1">
          <Icon.IconBell size={20} strokeWidth={1.5} />
        </div>
        {/* User */}
        <Menu
          trigger="hover"
          delay={100}
          control={
            <div className="px-1">
              <div className="flex flex-grow px-1">
                <Avatar color="blue" radius="xl">
                 MA
                </Avatar>
                <div className="flex flex-col">
                  <div className="pl-2">
                    Mulugeta Adamu
                  </div>
                  <div className="pl-2">{'Admin'}</div>
                </div>
              </div>
            </div>
          }
          styles={{
            itemHovered: { backgroundColor: 'rgb(229 231 235) !important' },
          }}
        >
          <Menu.Item
            onClick={() => console.log('Profile')}
            icon={<Icon.IconUserCircle size={20} strokeWidth={1.5} />}
          >
            Profile
          </Menu.Item>

          <Menu.Item
            icon={<Icon.IconLogout size={20} strokeWidth={1.5} />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
export default Header;
