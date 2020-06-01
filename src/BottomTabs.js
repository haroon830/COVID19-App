import React from 'react';
import {Image,Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Stats from './Continents'

const Tab = createMaterialBottomTabNavigator();


function continent() {
      let currColor = '#212121';  

  return (
    <Tab.Navigator
      initialRouteName="Asia"
      activeColor="#ffebee"
      inactiveColor="gray"
      barStyle={{ backgroundColor: currColor,paddingBottom: 5 }}
      shifting={false}
      labeled={true}
      
      
    >
    <Tab.Screen name="Asia" component={Stats} initialParams={{continent: "Asia"}}  
    options={{tabBarLabel: 'Asia',tabBarOptions: {pressColor: 'gray'},tabBarIcon:'flag' }} />
    <Tab.Screen name="Stats3" component={Stats} initialParams={{continent: "Australia"}} options={{tabBarLabel: 'Australia',tabBarIcon:'flag' }} />
    <Tab.Screen name="Europe" component={Stats} initialParams={{continent: "Europe"}} options={{tabBarIcon: 'Europe',tabBarIcon:'flag' }}  />
    
   
    
    <Tab.Screen name="Stats4" component={Stats} initialParams={{continent: "North America"}} options={{tabBarLabel: 'NorthAme.',tabBarIcon:'flag' }} />
    <Tab.Screen name="Stats2" component={Stats} initialParams={{continent: "Africa"}} options={{tabBarLabel: 'Africa',tabBarIcon:'flag' }} />
    <Tab.Screen name="Stats5" component={Stats} initialParams={{continent: "South America"}} options={{tabBarLabel: 'SouthAm.',tabBarIcon:'flag' }} />
    </Tab.Navigator>
  );
}

export default continent;