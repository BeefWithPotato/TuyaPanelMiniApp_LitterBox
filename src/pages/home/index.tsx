import React from 'react';
import { Text, View } from '@ray-js/ray';
import { NavBar, Button } from '@ray-js/smart-ui';
import { IconFont } from '@/components/icon-font';
import styles from './index.module.less';
import { Image } from '@ray-js/smart-ui';
import { useDpSchema, useProps, useDevInfo } from '@ray-js/panel-sdk';
import { getCloud, setCloud } from '@/utils/storage';
import litterBoxImage from '@/pages/assets/litterBox_image.jpg';

export default function Home() {
  // When the project starts, automatically pull the product schema information corresponding to the productId on the developer platform
  const dpSchema = useDpSchema();
  // Read dpState data from the device model
  const dpState = useProps(state => state); // Get all dpState
  const devInfo = useDevInfo();
  console.log('devInfo:', devInfo);
  console.log('dpSchema:', dpSchema);

  interface WeightRecord {
    weight: number;
    timestamp: number;
  }
  setCloud('cat_weight', devInfo.dpCodes.cat_weight);
  const [weightHistory, setWeightHistory] = React.useState<WeightRecord[]>([]);

  // Load stored weight history on component mount
  // React.useEffect(() => {
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
  // React.useEffect(() => {
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
