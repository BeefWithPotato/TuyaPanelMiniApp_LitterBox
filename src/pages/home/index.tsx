import React, { useState, useEffect } from 'react';
import { Text, View } from '@ray-js/ray';
import { NavBar, Button } from '@ray-js/smart-ui';
import { IconFont } from '@/components/icon-font';
import styles from './index.module.less';
import { Image } from '@ray-js/smart-ui';
import { useDpSchema, useProps, useDevInfo } from '@ray-js/panel-sdk';
import { getCloudData, setCloudData, getAllCloudData } from '@/utils/storage';
import { getAnalyticsLogsStatusLog } from '@ray-js/ray';
import litterBoxImage from '@/pages/assets/litterBox_image.jpg';

interface WeightRecord {
  weight: number;
  timestamp: number;
}

export default function Home() {
  const dpState = useProps(state => state); // Get all dpState
  const devInfo = useDevInfo();
  // When the project starts, automatically pull the product schema information corresponding to the productId on the developer platform
  const dpSchema = useDpSchema();
  // Read dpState data from the device model
  console.log('devInfo:', devInfo);
  console.log('dpSchema:', dpSchema);

  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);

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
          devId: 'vdevo175894599259650',
          dpIds: '6,7,8,9',
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

  // Load stored weight history on component mount
  // useEffect(() => {
  //   const loadWeightHistory = async () => {
  //     try {
  //       const result = await getCloud('weightHistory');
  //       if (result) {
  //         const storedHistory = JSON.parse(result) as WeightRecord[];
  //         if (Array.isArray(storedHistory)) {
  //           setWeightHistory(storedHistory);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error loading weight history:', error);
  //     }
  //   };
  //   loadWeightHistory();
  // }, []);

  // Watch for cat_weight DP changes
  // useEffect(() => {
  //   // Check if dpState has changed and contains cat_weight
  //   if (dpState && typeof dpState === 'object') {
  //     const catWeight = Object.entries(dpState).find(([key]) => key === 'cat_weight')?.[1];

  //     if (typeof catWeight === 'number') {
  //       const newWeight: WeightRecord = {
  //         weight: catWeight,
  //         timestamp: Date.now(),
  //       };

  //       // Update state with new weight
  //       const updatedHistory = [...weightHistory, newWeight];
  //       setWeightHistory(updatedHistory);

  //       // Store in persistent storage
  //       setCloud('weightHistory', JSON.stringify(updatedHistory))
  //         .then(() => {
  //           console.log('Weight history updated:', updatedHistory);
  //         })
  //         .catch(error => {
  //           console.error('Error storing weight:', error);
  //         });
  //     }
  //   }
  // }, [dpState, weightHistory]);

  return (
    <>
      <NavBar title="不锈钢智能猫砂盆" round onClickTitle={() => {}} />
      <View
        style={{
          display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          flexDirection: 'column',
          // backgroundColor: 'red',
        }}
      >
        {/* {Object.keys(dpSchema)?.map(schemaName => {
          return <Text style={{ color: 'black' }}>{schemaName}</Text>;
        })} */}
        <Image width="300px" height="300px" src={litterBoxImage} />
      </View>
      <View className={styles.view}>
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
      </View>
    </>
  );
}
