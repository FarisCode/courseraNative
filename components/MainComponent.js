import React, { Component } from 'react'
import Menu from './MenuComponent'
import { DISHES } from '../shared/Dishes'
import DishDetailComponent from './DishDetailComponent';
import { View } from 'react-native'

export default class MainComponent extends Component {
  state = {
    dishes: DISHES,
    selectedDish: null,
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Menu dishes={this.state.dishes} onPress={(dishId) => { this.onDishSelect(dishId) }} />
        <DishDetailComponent dish={this.state.dishes.filter(d => d.id === this.state.selectedDish)[0]} />
      </View>
    )
  }
}
