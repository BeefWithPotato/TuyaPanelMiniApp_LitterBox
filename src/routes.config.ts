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
    path: '/pages/CustomSettings/index',
    name: 'CustomSettings',
  },
];

// export const tabBar: TabBar = {
//   textColor: '#6b7280', // Gray-500: unselected text
//   selectedColor: '#0078FF', // Bright blue for active
//   backgroundColor: '#F9FAFB', // Light gray background
//   borderStyle: 'white', // Optional: top border color of tab bar
//   list: [
//     {
//       route: '/',
//       text: 'Home',
//       icon: '/images/tabbar/home.svg',
//       activeIcon: '/images/tabbar/home.svg',
//       pagePath: '/pages/home/index',
//     },
//     {
//       route: '/customSettings',
//       text: 'CustomSettings',
//       icon: '/images/tabbar/settings.svg',
//       activeIcon: '/images/tabbar/settings.svg',
//       pagePath: '/pages/CustomSettings/index',
//     },
//   ],
// };
