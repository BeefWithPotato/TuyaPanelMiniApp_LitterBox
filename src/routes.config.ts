import { Routes, TabBar } from '@ray-js/types';
// import houseIcon from '@tuya-miniapp/icons/dist/svg/House';
// import pawPrintIcon from '@tuya-miniapp/icons/dist/svg/PawPrint';

export const routes: Routes = [
  {
    route: '/',
    path: '/pages/home/index',
    name: 'Home',
  },
  {
    route: '/customSettings',
    path: '/pages/Settings/index',
    name: 'Settings',
  },
];

export const tabBar: TabBar = {
  textColor: '#000000',
  selectedColor: '#ff0000',
  backgroundColor: '#ffffff',
  list: [
    {
      route: '/',
      text: 'Home',
      icon: '/images/tabbar/home.svg',
      activeIcon: '/images/tabbar/home.svg',
      pagePath: '/pages/home/index',
    },
    {
      route: '/customSettings',
      text: 'CustomSettings',
      icon: '/images/tabbar/settings.svg',
      activeIcon: '/images/tabbar/settings.svg',
      pagePath: '/pages/Settings/index',
    },
  ],
};
