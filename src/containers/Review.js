import { connect } from 'react-redux';
import { login } from '../actions';
import ReviewComponent from '../components/ReviewComponent';

const mapStateToProps = (state) => ({
  user: state.user,
  other: state.other,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch(login(user));
  },
});

const Review = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewComponent);

export default Review;
