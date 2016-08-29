const other = (state = {}, action) => {
  switch (action.type) {
    case 'SET':
      return action.other;
    case 'REMOVE':
      return {};
    default:
      return state;
  }
};

export default other;
