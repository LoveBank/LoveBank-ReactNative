import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MKTextField as TextField,
  MKButton,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../api/api';

const FlatButton = MKButton.coloredButton()
.build();

const TextfieldWithFloatingLabel = TextField.textfieldWithFloatingLabel()
  .withPlaceholder('Email')
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
    color: '#fff',
  })
  .build();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62828',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});

export default class FindOtherComponent extends Component {
  static propTypes = {
    other: React.PropTypes.object.isRequired,
    set: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      other: { ...props.other },
      invalid: false,
    };
  }

  onChangeText = (value) => {
    this.setState({
      other: {
        email: value,
      },
    });
  }

  onClick = () => {
    API.getProfileByEmail(this.state.other.email)
      .subscribe(other => {
        if (Object.keys(other).length === 0) {
          this.setState({ invalid: true });
        } else {
          this.props.set(other);
          Actions.review();
        }
      }, () => {
        this.setState({ invalid: true });
      });
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#CC0000" // Dark Red
          barStyle="light-content"
        />
        <Text style={styles.title}>
          Please enter the email of your <Icon size={20} name="heart" color="#fff" />
        </Text>
        <Text style={styles.title}>
          {this.state.invalid ? "That email doesn't seem to be in our system, please try another?" : ""}
        </Text>
        <TextfieldWithFloatingLabel
          placeholder="Email"
          placeholderTextColor="#fff"
          tintColor="#fff"
          highlightColor="#CC0000"
          textInputStyle={{ color: '#fff' }}
          keyboardType="email-address"
          onSubmitEditing={this.onClick}
          style={{ margin: 40, width: width - 80, height: 50 }}
          onChangeText={this.onChangeText}
        />
        <FlatButton
          onPress={this.onClick}
          backgroundColor="highlightC0"
          shadowRadius={2}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.7}
          shadowColor="black"
          style={{ backgroundColor: '#CC0000', width: width - 80, margin: 40 }}
        >
          <Text
            style={{ color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              margin: 5,
              textAlign: 'center',
            }}
          >Enter</Text>
        </FlatButton>
      </View>
    );
  }
}

