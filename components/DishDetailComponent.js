import React from 'react'
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'space-around' }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} readonly imageSize={10} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
  return (
    <Card title='Comments' >
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id + ''}
      />
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={{ uri: `${baseUrl}${dish.image}` }}
      >
        <Text style={{ margin: 10 }}>
          {dish.description}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon
            raised
            reverse
            name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color='#512DA8'
            onPress={props.toggleModal}
          />
        </View>
      </Card>
    )
  } else {
    return (
      <View></View>
    )
  }
}

class DishDetailComponent extends React.Component {

  state = {
    showModal: false,
    rating: 3,
    author: '',
    comment: '',
  }

  static navigationOptions = {
    title: 'Dish Details'
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleForm = () => {
    const dishId = this.props.navigation.getParam('dishId', '');
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    this.toggleModal();
    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      rating: 3,
      author: '',
      comment: '',
    })
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
          favorite={favorite = this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={this.toggleModal}
        />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        <Modal animationType={"slide"} transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>
            <View>
              <Rating
                onFinishRating={(v) => { this.setState({ rating: v }) }}
                startingValue={this.state.rating}
                showRating
              />
              <Input
                placeholder='Author'
                value={this.state.author}
                onChangeText={(v) => { this.setState({ author: v }) }}
                inputStyle={styles.input}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
              />
              <Input
                value={this.state.comment}
                onChangeText={(v) => { this.setState({ comment: v }) }}
                placeholder='Comment'
                inputStyle={styles.input}
                leftIcon={{
                  type: 'font-awesome', name: 'comment'
                }}
              />
            </View>
            <View>
              <Button
                style={{ margin: 10 }}
                onPress={this.handleForm}
                color="#512DA8"
                title="Submit"
              />
              <Button
                onPress={() => { this.toggleModal(); this.resetForm(); }}
                color="#777"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-between',
  },
  input: {
    padding: 15,
  },
  rating: {
    backgroundColor: '#f00'
  }
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetailComponent);