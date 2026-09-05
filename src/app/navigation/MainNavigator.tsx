import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../../features/home/presentation/screens/HomeScreen';
import { ConversionToolScreen } from '../../features/conversion/presentation/screens/ConversionToolScreen';
import { ConversionProgressScreen } from '../../features/conversion/presentation/screens/ConversionProgressScreen';
import { ConversionSuccessScreen } from '../../features/conversion/presentation/screens/ConversionSuccessScreen';
import { ConversionErrorScreen } from '../../features/conversion/presentation/screens/ConversionErrorScreen';
import { RecentScreen } from '../../features/recent/presentation/screens/RecentScreen';
import { SettingsScreen } from '../../features/settings/presentation/screens/SettingsScreen';

import { ScanCameraScreen } from '../../features/scanner/presentation/screens/ScanCameraScreen';
import { ScanFilterScreen } from '../../features/scanner/presentation/screens/ScanFilterScreen';
import { ScanExportScreen } from '../../features/scanner/presentation/screens/ScanExportScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ConversionTool" component={ConversionToolScreen} />
      <Stack.Screen name="ConversionProgress" component={ConversionProgressScreen} />
      <Stack.Screen name="ConversionSuccess" component={ConversionSuccessScreen} />
      <Stack.Screen name="ConversionError" component={ConversionErrorScreen} />
      <Stack.Screen name="Recent" component={RecentScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* Camera & Document Scanner Routes */}
      <Stack.Screen name="ScanCamera" component={ScanCameraScreen} />
      <Stack.Screen name="ScanFilter" component={ScanFilterScreen} />
      <Stack.Screen name="ScanExport" component={ScanExportScreen} />
    </Stack.Navigator>
  );
};
