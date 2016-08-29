const login = (user) => ({
  type: 'LOGIN',
  user,
});

const set = (other) => ({
  type: 'SET',
  other,
});

export { login, set };
