import { connect } from 'react-redux';
import { set } from '../actions';
import FindOtherComponent from '../components/FindOtherComponent';

const mapStateToProps = (state) => ({
  other: state.other,
});

const mapDispatchToProps = (dispatch) => ({
  set: (other) => {
    dispatch(set(other));
  },
});

const FindOther = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindOtherComponent);

export default FindOther;
