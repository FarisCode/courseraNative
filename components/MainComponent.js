import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DishDetail from './DishDetailComponent';


const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  DishDetail: { screen: DishDetail }
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

export default class MainComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MenuNavigator />
      </View>
    )
  }
}
