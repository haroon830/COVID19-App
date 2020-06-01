import 'react-native-gesture-handler';
import React,{Component} from 'react';
import continent from './src/BottomTabs';
import Worldwide from './src/GlobalSummary';
import Home from './src/countriesList';
import ByCountry from './src/countrySummary'
import { createDrawerNavigator,drawerBackgroundColor,drawerLabel,DrawerMenu } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class Stacks extends Component {
  render(){
    return(
  <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{ title: 'COVID-19 ',
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'black'},
        headerLeft: () => (
        <Icon 
        name="menu" size={30} 
        style={{marginLeft: 20}} 
        onPress={() => this.props.navigation.openDrawer()} 
        color='white'></Icon>
    ), }} />
      
       <Stack.Screen name="ByCountry" 
       component={ByCountry}
        options={{ title: 'Country Summary',
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'black'},
        headerRight: () => (
        <Icon 
        name="menu" 
        size={30} 
        style={{marginRight: 20}} 
        onPress={() => this.props.navigation.openDrawer()} 
        color='white'></Icon>
    ), }} />
      <Stack.Screen 
      name="Worldwide" 
      backgroundColor='black'
      component={Worldwide} 
      options={{ title: 'Worldwide',
      headerTintColor: 'white',
    }} 
      />
      <Stack.Screen 
      name="RegStats"
      component={continent} 
      options={{ title: 'continent',
      headerTintColor: 'black',
       headerStyle: {backgroundColor: 'black'}
      }}
      />
  </Stack.Navigator>
    );
    }
}



export default class App extends Component{
  render(){
  return (
    <NavigationContainer>
    <Drawer.Navigator drawerStyle={{backgroundColor:'lightblue'}}>
      <Drawer.Screen 
      name="Home" 
      component={Stacks} 
      options={{ 
        drawerLabel: 'Home',
        drawerIcon: () =>(
          <Icon name="home"
          size={30}
        />
        ) 
      }}
      />
      <Drawer.Screen 
      name="Worldwide"
      component={Worldwide} 
      options={{drawerLabel: 'GLOBAL',title: "Global Summary",
      drawerIcon: () =>(
        <Icon name="earth"
        size={30}
      />
      ) 
    }}
    />
      <Drawer.Screen 
      name="continent" 
      component={continent} 
      options={{ drawerLabel: 'Continent',
      drawerIcon: () =>(
        <Icon name="flag"
        size={30}
      />
      ) 
    }}
    />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}


}