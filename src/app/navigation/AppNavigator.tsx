import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingScreen } from '../../features/conversions/presentation/screens/OnboardingScreen';
import { HomeScreen } from '../../features/conversions/presentation/screens/HomeScreen';
import { ConvertScreen } from '../../features/conversions/presentation/screens/ConvertScreen';
import { ProgressScreen } from '../../features/conversions/presentation/screens/ProgressScreen';
import { CompleteScreen } from '../../features/conversions/presentation/screens/CompleteScreen';
import { HistoryScreen } from '../../features/conversions/presentation/screens/HistoryScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Convert: undefined;
  Progress: undefined;
  Complete: undefined;
  History: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#faf8ff' },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Convert" component={ConvertScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Complete" component={CompleteScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
