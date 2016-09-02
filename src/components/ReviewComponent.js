import React, { Component } from 'react';
import { Observable } from 'rxjs';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntryModal from './EntryModal';
import api from '../api/api';

const styles = StyleSheet.create({
  entryText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#fff',
  },
  myEntryText: {
    fontSize: 18,
    textAlign: 'right',
    color: '#fff',
  },
  reviews: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  myReviews: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
});

export default class ReviewComponent extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    other: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      loading: true,
      refereshing: false,
      showModal: false,
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  createEntry = (entry, rating) => {
    api.createEntry(entry, rating, this.props.user.id, this.props.other.id).subscribe(() => {
      this.toggleModal();
      this.fetchEntries();
    });
  }

  dataSourceGenerator = () => this.state.ds.cloneWithRows(this.state.entries);

  fetchEntries = () => {
    this.setState({ refreshing: true });
    // simplify the following flatmaps with a reducer function in the zip
    Observable
        .zip(api.getEntriesForUser(this.props.user.id), api.getEntriesForUser(this.props.other.id))
        .flatMap(r => r)
        .flatMap(r => r)
        .toArray()
        .subscribe(entries => {
          const sortedEntries = entries.sort((a, b) => new Date(b['occurred-on']) - new Date(a['occurred-on']));
          this.setState({
            entries: sortedEntries,
            loading: false,
            refreshing: false,
          });
        });
  }

  renderRow = (entry) =>
    <TouchableHighlight style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignSelf: 'stretch', margin: 20 }}>
        <Text style={entry.id === this.props.user.id ? styles.myEntryText : styles.entryText}>
          {entry.note}
        </Text>
        <View style={entry.id === this.props.user.id ? styles.myReviews : styles.reviews}>
          {(function ratings() {
            const rating = [];
            for (step = 0; step < entry.rating; step++) {
              rating.push(<Icon size={20} name="heart" color="#fff" key={step} />);
            }
            return rating;
          }())}
        </View>
      </View>
    </TouchableHighlight>

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) =>
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: 'grey',
      }}
    />

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" size="large" animating />
        </View>
      );
    } else if (this.state.entries.length === 0) {
      return (
        <View style={styles.container}>
          <Text>It appears that there are not entries. Go ahead and submit some!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#CC0000" // Dark Red
          barStyle="light-content"
        />
        <EntryModal
          onRequestClose={this.toggleModal}
          display={this.state.showModal}
          onSubmit={this.createEntry}
        />
        <ListView
          dataSource={this.dataSourceGenerator()}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchEntries}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#fff']}
              progressBackgroundColor="#CC0000"
            />
          }
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.toggleModal}
        />
      </View>
    );
  }
}
