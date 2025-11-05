import React from 'react';
import { utils } from '@ray-js/panel-sdk';
import { View, Text } from '@ray-js/ray';
import { SmartEvent, Tabbar, TabbarItem, ConfigProvider } from '@ray-js/smart-ui';
import { Icon } from '@ray-js/icons';
import { TabType } from '@/constant';
import Strings from '@/i18n';
import { useSelector } from '@/redux';
import { updateUI } from '@/redux/action';
import styles from './index.module.less';

const TabBar = () => {
  const tab = useSelector(({ uiState }) => uiState.tab);

  const onChange = (e: SmartEvent<TabType>) => {
    updateUI({ tab: e.detail });
  };

  return (
    <ConfigProvider
      themeVars={{
        tabbarBackgroundColor: '#ffffff',
      }}
    >
      <Tabbar
        active={tab}
        safeAreaInsetBottom={true}
        onChange={(e: SmartEvent<TabType>) => {
          updateUI({ tab: e.detail });
        }}
      >
        <TabbarItem
          name={TabType.Home}
          style={{
            borderRadius: 12,
            padding: '8px 16px',
            transition: 'all 0.3s',
            margin: '4px 8px',
            backgroundColor: tab === TabType.Home ? '#007aff' : '',
            transitionProperty: 'background-color',
            transitionDuration: '0.5s',
            transitionTimingFunction: 'ease',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="icon-icon-2" size={25} color={tab === TabType.Home ? 'white' : 'black'} />
            <Text
              style={{
                color: tab === TabType.Home ? 'white' : 'black',
                marginLeft: '5px',
                fontSize: 25,
              }}
            >
              Home
            </Text>
          </View>
        </TabbarItem>
        <TabbarItem
          name={TabType.CustomSettings}
          style={{
            borderRadius: 12,
            padding: '8px 16px',
            transition: 'all 0.3s',
            margin: '4px 8px',
            backgroundColor: tab === TabType.CustomSettings ? '#007aff' : '',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              type="icon-a-wrenchandscrewdriverfill"
              size={25}
              color={tab === TabType.CustomSettings ? 'white' : 'black'}
            />
            <Text
              style={{
                color: tab === TabType.CustomSettings ? 'white' : 'black',
                marginLeft: '5px',
                fontSize: 25,
              }}
            >
              Settings
            </Text>
          </View>
        </TabbarItem>
      </Tabbar>
    </ConfigProvider>
  );
};

export default TabBar;
