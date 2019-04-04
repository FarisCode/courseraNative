import React from 'react'
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

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
    <Animatable.View animation="fadeInUp" duration={500} delay={300}>
      <Card title='Comments' >
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id + ''}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  handleViewRef = ref => this.view = ref;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    return dx < -200;
  }
  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    return dx > 200;
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
          ],
          { cancelable: false }
        );
      }
      if (recognizeComment(gestureState)) {
        props.toggleModal();
      }
      return true;
    }
  })

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        delay={300}
        {...panResponder.panHandlers}
        ref={this.handleViewRef}
      >
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
      </Animatable.View>
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