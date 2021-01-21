import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppStackScreens from './src/stacks/AppStackScreens';
import { UserProvider } from './src/context/UserContext';
import { FirebaseProvider } from './src/context/firebaseContext';

import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
    </UserProvider>
    </FirebaseProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
