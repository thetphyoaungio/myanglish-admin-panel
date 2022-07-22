import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Translate Data Management',
    icon: 'layout-outline',
    link:'/pages/translate-data-management',
    home: true,
    children: [
      {
        title: 'Myanglish Words',
        link: '/pages/translate-data-management/myanglish-words',
      },
      {
        title: 'Myanmar Words',
        link: '/pages/translate-data-management/myanmar-words',
      },
    ],
  },
];
