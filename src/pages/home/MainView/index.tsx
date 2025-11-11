import React, { useState, useEffect, Fragment, FC } from 'react';
import { useHideMenuButton, useSelectorMemoized } from '@/hooks';
import { selectSafeArea } from '@/redux/modules/systemInfoSlice';
import { Text, View, getAnalyticsLogsStatusLog } from '@ray-js/ray';
import {
  NavBar,
  Button,
  Tabbar,
  TabbarItem,
  Divider,
  Tabs,
  Tab,
  Grid,
  GridItem,
  ConfigProvider,
} from '@ray-js/smart-ui';
import { IconFont } from '@/components/icon-font';
import { Icon } from '@ray-js/icons';
import styles from './index.module.less';
import { Image } from '@ray-js/smart-ui';
import { useDpSchema, useProps, useDevInfo } from '@ray-js/panel-sdk';
import { getCloudData, setCloudData, getAllCloudData } from '@/utils/storage';
import litterBoxImage from '@/pages/assets/banner.jpg';
import { router } from '@ray-js/ray';
import { TopBar } from '@/components';
import { useSelector } from '@/redux';
import PaintBrush from '@tuya-miniapp/icons/dist/svg/PaintBrush';
import DeleteIcon from '@tuya-miniapp/icons/dist/svg/DeleteLine';
import LevelIcon from '@tuya-miniapp/icons/dist/svg/ArrowSquare';
import { getDevProperty, saveDevProperty } from '@ray-js/ray';
import { getDeviceProperty, getLaunchOptionsSync } from '@ray-js/ray';
import { setBackgroundColor } from '@ray-js/api';

export default function () {
  const displayTop = [
    {
      label: '今日如厕',
      dpID: 7,
      dpCode: 'excretion_times_day',
      unit: '次',
    },

    {
      label: '如厕时常',
      dpID: 8,
      dpCode: 'excretion_time_day',
      unit: '秒',
    },
  ];

  const displayMiddle = [
    {
      label: '猫砂盆状态',
      dpID: 108,
      dpCode: 'work_status',
      // unit: '次',
    },

    {
      label: '集便仓状态',
      dpID: 113,
      dpCode: 'bin_status',
      // unit: '秒',
    },
    {
      label: '今日如厕',
      dpID: 7,
      dpCode: 'excretion_times_day',
      // unit: '次',
    },
  ];

  const controlBtns = [
    {
      label: '清理',
      dpID: 3,
      dpCode: 'start',
      icon: PaintBrush,
    },
    {
      label: '清砂',
      dpID: 107,
      dpCode: 'clear',
      icon: DeleteIcon,
    },
    {
      label: '抚平',
      dpID: 103,
      dpCode: 'level',
      icon: LevelIcon,
    },
  ];
  //   const safeArea = useSelectorMemoized(selectSafeArea);
  //   useHideMenuButton();

  //   const tab = useSelector(({ uiState }) => uiState.tab);
  //   console.log('Current tab:', tab);

  //   const dpState = useProps(state => state); // Get all dpState
  const devInfo = useDevInfo();
  // When the project starts, automatically pull the product schema information corresponding to the productId on the developer platform
  const dpSchema = useDpSchema();
  // Read dpState data from the device model
  console.log('devInfo:', devInfo);
  console.log('dpSchema:', dpSchema);

  //   useEffect(() => {
  //     // 6: cat_weight g
  //     // 7: excretion_times_day 每天排泄次数
  //     // 8: excretion_time_day 每次排泄时长
  //     // 9： manual_clean 手动清理 Boolean

  //     const getCatWeightReportData = async () => {
  //       try {
  //         console.log('devInfo?.devId', devInfo?.devId);
  //         console.log('dpSchema.cat_weight.id.toString()', dpSchema.cat_weight.id.toString());
  //         const res = await getAnalyticsLogsStatusLog({
  //           devId: devInfo?.devId,
  //           dpIds: '6,7,8',
  //           // dpIds: 'cat_weight',
  //           offset: 0,
  //           limit: 20,
  //           // startTime: '1760392672',
  //           // endTime: new Date().getTime().toString(),
  //         });
  //         console.log('✅ Cloud data loaded:', res);
  //       } catch (err) {
  //         console.error('❌ Failed to load cloud data:', err);
  //       }
  //     };
  //     getCatWeightReportData();
  //   }, [devInfo?.devId]);

  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            display: 'flex',
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            // marginLeft: '30px',
          }}
        >
          <Image
            width="270px"
            height="270px"
            // src={devInfo?.iconUrl}
            src={litterBoxImage}
          />
        </View>
        {/* Status Display */}
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {displayTop.map(dp => {
            return (
              <View key={dp.dpCode}>
                <View>
                  <Text style={{ fontSize: 60, color: 'black', marginRight: '5px' }}>
                    {devInfo.dps[dp.dpID]}
                  </Text>
                  <Text style={{ fontSize: 30, color: 'black' }}>{dp.unit}</Text>
                </View>
                <Text style={{ fontSize: 30, color: '#8C8C8C' }}>{dp.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Control Buttons */}
      {/* <Divider
        customStyle={{
          color: 'black',
          borderColor: 'black',
          width: '80%',
        }}
      /> */}
      <View
        style={{
          display: 'flex',
          margin: '10px 10px 10px 10px',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#f2f4f6',
          borderRadius: '20px',
          height: '80px',
        }}
      >
        {controlBtns.map(btn => {
          return (
            <Button
              className={styles.bottomButton}
              type="primary"
              key={btn.label}
              round
              customStyle={{ width: '100px' }}
              icon={btn.icon}
            >
              {btn.label}
            </Button>
          );
        })}
      </View>
      {/* Grid View */}
      {/* <View
        style={{
          margin: '0 10px 0 10px',
          padding: '10px 0 10px 0',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          // width: '100%',
        }}
      > */}
      <ConfigProvider
        themeVars={{
          gridItemContentBackgroundColor: '#ffffff',
          gridItemTextColor: 'black',
          gridItemTextFontSize: '20px',
        }}
      >
        <Grid direction="horizontal" columnNum={3} clickable={false} gutter="2px">
          {displayMiddle.map((dp, index) => (
            <GridItem key={`${index + 1}`} useSlot>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Text style={{ fontSize: 30, color: '#8C8C8C' }}>{dp.label}</Text>
                <Text style={{ fontSize: 30, color: 'black' }}>{devInfo?.dps[dp.dpID]}</Text>
              </View>
            </GridItem>
          ))}
        </Grid>
      </ConfigProvider>
      {/* </View> */}

      {/* Line Graph */}
      <View style={{ backgroundColor: '' }}></View>
    </View>
  );
}
