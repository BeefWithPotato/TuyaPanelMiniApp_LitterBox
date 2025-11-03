import React, { useState, useEffect, Fragment } from 'react';
import { useHideMenuButton, useSelectorMemoized } from '@/hooks';
import { selectSafeArea } from '@/redux/modules/systemInfoSlice';
import { Text, View, getAnalyticsLogsStatusLog } from '@ray-js/ray';
import { NavBar, Button, Tabbar, TabbarItem } from '@ray-js/smart-ui';
import { IconFont } from '@/components/icon-font';
import styles from './index.module.less';
import { Image } from '@ray-js/smart-ui';
import { useDpSchema, useProps, useDevInfo } from '@ray-js/panel-sdk';
import { getCloudData, setCloudData, getAllCloudData } from '@/utils/storage';
import litterBoxImage from '@/pages/assets/litterBox_image.jpg';
import { router } from '@ray-js/ray';
import TopBar from '@/components/TopBar';

interface WeightRecord {
  weight: number;
  timestamp: number;
}

export default function Settings() {
  const safeArea = useSelectorMemoized(selectSafeArea);
  useHideMenuButton();

  const dpState = useProps(state => state); // Get all dpState
  const devInfo = useDevInfo();
  // When the project starts, automatically pull the product schema information corresponding to the productId on the developer platform
  const dpSchema = useDpSchema();
  // Read dpState data from the device model
  console.log('devInfo:', devInfo);
  console.log('dpSchema:', dpSchema);

  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);
  const [active, setActive] = useState(0);
  // const onNavTabChange = e => {
  //   setActive(e.detail);
  // };

  const onNavTabChange = e => {
    setActive(e.detail);

    // Navigate to corresponding page
    if (e.detail === 'home') {
      router.push('/');
    } else if (e.detail === 'setting') {
      router.push('/settings');
    }
  };

  useEffect(() => {
    // 6: cat_weight g
    // 7: excretion_times_day 每天排泄次数
    // 8: excretion_time_day 每次排泄时长
    // 9： manual_clean 手动清理 Boolean

    const getCatWeightReportData = async () => {
      try {
        console.log('devInfo?.devId', devInfo?.devId);
        console.log('dpSchema.cat_weight.id.toString()', dpSchema.cat_weight.id.toString());
        const res = await getAnalyticsLogsStatusLog({
          devId: devInfo?.devId,
          dpIds: '6,7,8',
          // dpIds: 'cat_weight',
          offset: 0,
          limit: 20,
          // startTime: '1760392672',
          // endTime: new Date().getTime().toString(),
        });
        console.log('✅ Cloud data loaded:', res);
      } catch (err) {
        console.error('❌ Failed to load cloud data:', err);
      }
    };
    getCatWeightReportData();
  }, [devInfo?.devId]);

  // const res = await getAllCloudData();
  // console.log('All Cloud Data:', res);
  // setCloudData('cat_weight', devInfo.dpCodes.cat_weight);

  return (
    <View className={styles.container} style={{ paddingTop: `${safeArea?.top ?? 48}px` }}>
      <TopBar />
      {/* <NavBar title="不锈钢智能猫砂盆!!!!!" round onClickTitle={() => {}} />
      <View
        style={{
          display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          flexDirection: 'column',
          // backgroundColor: 'red',
        }}
      >
        {Object.keys(dpSchema)?.map(schemaName => {
          return <Text style={{ color: 'black' }}>{schemaName}</Text>;
        })}
        <Image width="300px" height="300px" src={litterBoxImage} />
      </View> */}
      {/* <Tabbar active={active} safeAreaInsetBottom={false} onChange={onNavTabChange}>
        <TabbarItem name="home" icon={houseIcon}>
          Home
        </TabbarItem>
        <TabbarItem name="setting" icon={pawPrintIcon}>
          Setting
        </TabbarItem>
      </Tabbar> */}
      {/* <View className={styles.view}>
        <View
          className={styles.content}
          onClick={() => {
            // actions.switch_1.toggle();
          }}
        >
          <View className={styles['space-around']} style={{ marginTop: '50rpx' }}>
            <Text>Public SDM Template</Text>
            <Button type="primary">Smart UI Primary Button</Button>
            <IconFont icon="sun" />
          </View>
        </View>
      </View> */}
    </View>
  );
}
