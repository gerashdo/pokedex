import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from './Navigation';
import { SearchScreen } from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {

    // const serMarginBottom = () => {
    //     if( Platform === '')
    // }
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle:{
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderWidth: 0,
                elevation: 0,
                height: ( Platform.OS === 'android' ) ? 60 : 80, 
            },
            tabBarActiveTintColor: '#066EC2',
            tabBarLabelStyle:{
                marginBottom: ( Platform.OS === 'android' ) ? 10 : 0,
            }
        }}
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
    >
      <Tab.Screen 
        name="Home" 
        component={ Navigation } 
        options={{ 
            tabBarLabel: 'Lista',
            tabBarIcon: ({ color }) => (
                <Icon 
                    size={ 25 }
                    color={ color }
                    name="list-outline"
                />
            )
        }}
    />
      <Tab.Screen 
        name="SearchScreen" 
        component={ SearchScreen } 
        options={{ 
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ color }) => (
                <Icon 
                    size={ 25 }
                    color={ color }
                    name="search-outline"
                />
            )
        }}
    />
    </Tab.Navigator>
  );
}
