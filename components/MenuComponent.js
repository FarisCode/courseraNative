import React from 'react'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends React.Component {

  state = {
    dishes: DISHES,
    selectedDish: null,
  }
  static navigationOptions = {
    title: 'Menu'
  }

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          onPress={() => navigate('DishDetail', { dishId: item.id })}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: require('./images/uthappizza.png') }}
        />
      )
    }
    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
}

export default Menu;
