import * as Icon from '@tabler/icons';

export interface Menu {
  name: string;
  shortName: string;
  key: string;
  baseUrl?: string;
  isApp?: boolean;
  icon: Icon.TablerIcon;
  roles: string[];
  subMenus?: Menu[];
}
