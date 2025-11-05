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

export default function Settings() {
  return <View></View>;
}
