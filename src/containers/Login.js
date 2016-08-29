import { connect } from 'react-redux';
import { login } from '../actions';
import LoginComponent from '../components/LoginComponent';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch(login(user));
  },
});

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default Login;
