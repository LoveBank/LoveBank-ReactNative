import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal,
  View,
  Dimensions,
  Picker,
} from 'react-native';

import {
  MKTextField as TextField,
  MKButton,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62828',
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

  render() {
    const { width } = Dimensions.get('window');
    return (
      <Modal
        animationType={"fade"}
        transparent
        visible={this.props.display}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.container}>
          <TextField
            floatingLabelFont={{
              fontSize: 10,
              fontStyle: 'italic',
              fontWeight: '200',
              color: '#fff',
            }}
            floatingLabelEnabled
            placeholder="Entry"
            placeholderTextColor="#fff"
            tintColor="#fff"
            highlightColor="#CC0000"
            textInputStyle={{ color: '#fff' }}
            style={{ margin: 40, width: width - 80 }}
            onChangeText={this.onChangeText}
          />
          <Picker
            style={{
              margin: 40,
              width: width - 80,
              color: '#fff',
            }}
            selectedValue={this.state.rating}
            onValueChange={(rating) => {
              this.setState({ rating });
            }}
            mode="dialog"
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
          </Picker>
          <View>

            <TouchableHighlight onPress={() => this.props.onSubmit(this.state.entry, this.state.rating)} >
              <Text style={{ color: '#fff' }}>Submit</Text>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>
    );
  }
}
