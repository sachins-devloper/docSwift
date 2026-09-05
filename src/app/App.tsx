import React from 'react';
import { AppProvider } from './providers/AppProvider';
import { RootNavigator } from './navigation/RootNavigator';

export const App = () => {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
};

export default App;
