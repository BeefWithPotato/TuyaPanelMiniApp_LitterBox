import React, { FC } from 'react';
import { Text, View } from '@ray-js/components';
import { Icon } from '@ray-js/icons';
import { exitMiniProgram } from '@ray-js/api';
import { router } from 'ray';
import { openDeviceDetailPage } from '@ray-js/ray';
import { TouchableOpacity } from '@/components';
import styles from './index.module.less';
import { getDevId } from '@/utils';

const TopBar: FC = () => {
  console.log('TopBar rendered', getDevId());
  const handleGoToSettings = () => {
    // router.push('/settings');
    openDeviceDetailPage({
      deviceId: getDevId(),
    });
  };

  const handleExitProgram = () => {
    exitMiniProgram();
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title}>{'猫砂盆'}</Text>
      <View className={styles.toolsWrapper}>
        <TouchableOpacity className={styles.tool} onClick={handleGoToSettings}>
          {/* <Text className="iconfontpanel icon-panel-more" /> */}
          <Icon type="icon-icon" size={30} />
        </TouchableOpacity>
        <TouchableOpacity className={styles.tool} onClick={handleExitProgram}>
          {/* <Text className="iconfontpanel icon-panel-closeFill" /> */}
          <Icon type="icon-xmark" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
