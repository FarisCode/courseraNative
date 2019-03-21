import React, { Component } from 'react';
import { View } from 'react-native';
import DishDetail from './DishDetailComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  DishDetail: { screen: DishDetail },
},
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
},
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  }
}, {
    drawerBackgroundColor: '#D1C4E9'
  }
);

export default class MainComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    )
  }
}
