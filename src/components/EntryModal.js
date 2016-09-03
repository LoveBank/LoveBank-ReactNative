import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View,
  Dimensions,
} from 'react-native';

import {
  MKTextField as TextField,
  MKButton,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window');
const FlatButton = MKButton.coloredButton().build();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62828',
    height: height - (height * 0.5),
    width: width - 40,
    margin: 20,
    marginTop: 80,
  },
  heading3: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    marginTop: 80,
  },
});

export default class EntryModal extends Component {
  static propTypes = {
    display: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      entry: {
        rating: 5,
        entry: '',
      },
    };
  }

  onChangeText = (value) => {
    this.setState({
      entry: value,
    });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent
        visible={this.props.display}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.container}>
          <Text style={styles.heading3}>What are you giving your partner credit for?</Text>
          <TextField
            floatingLabelFont={{
              fontSize: 10,
              fontStyle: 'italic',
              fontWeight: '200',
              color: '#fff',
            }}
            placeholder="Journal Entry"
            multiline
            placeholderTextColor="#fff"
            tintColor="#fff"
            highlightColor="#fff"
            textInputStyle={{ color: '#fff' }}
            style={{ margin: 0,
              marginTop: 0,
              width: width - 80,
              height: 200,
              backgroundColor: '#000',
              borderWidth: 0.5,
              borderRadius: 4 }}
            onChangeText={this.onChangeText}
          />
          <StarRating
            disabled={false}
            emptyStar={'ios-heart-outline'}
            fullStar={'ios-heart'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            starColor={'red'}
          />
          <View>
            <FlatButton
              onPress={() => this.props.onSubmit(this.state.entry, this.state.starCount)}
              backgroundColor="highlightC0"
              shadowRadius={2}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.7}
              shadowColor="black"
              style={{ backgroundColor: '#CC0000', width: width - 100 }}
            >
              <Text
                style={{ color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  margin: 5,
                  textAlign: 'center',
                }}
              >Submit</Text>
            </FlatButton>
          </View>
          <TouchableHighlight onPress={this.props.onRequestClose} style={{ position: 'absolute', top: 20, right: 20 }}>
            <Icon size={20} name="times" color="#fff" />
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}
