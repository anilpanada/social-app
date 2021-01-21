import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Message from '../screens/Message';
import Post from '../screens/Post';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';

const MainStackScreens = () => {
    const MainStack =  createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#222222',
            paddingBottom: 10,
        }
    }

    const screenOptions = (({route}) => ({
        tabBarIcon: ({focused}) => {
            let iconName = "ios-home"
            
            switch(route.name){
                case "Home":
                    iconName = "ios-home"
                    break;
                case "Message":
                    iconName = "ios-chatbubbles-sharp"
                    break;
                case "Notification":
                    iconName = "ios-notifications"
                    break;
                case "Profile":
                    iconName = "ios-person"
                    break;
                default :
                    iconName = "ios-home"
                    break;  
            }

            if (route.name === "Post"){
                return (
                    <Ionicons name="ios-add-circle" size={48} color="#23a8d9"
                        style={{
                            shadowColor: "#ffffff",
                            shadowOffset: { width: 0, height: 10},
                            shadowRadius: 10,
                            shadowOpacity: 1,
                        }}
                    />
                );
            }

            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />
        }
    }))

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions} >
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Message" component={Message} />
            <MainStack.Screen name="Post" component={Post} />
            <MainStack.Screen name="Notification" component={Notification} />
            <MainStack.Screen name="Profile" component={Profile} />
        </MainStack.Navigator>
    )
}
export default MainStackScreens;