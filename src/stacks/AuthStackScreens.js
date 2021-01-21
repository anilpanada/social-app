import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
import Login from '../screens/Login';
import Register from '../screens/Register';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStackScreens = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator headerMode="none" initialRouteName={Register}>
            
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
    );
}

export default AuthStackScreens;

