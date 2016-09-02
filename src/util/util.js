export default {
  isEmpty(obj) {
    if (obj) {
      return Object.keys(obj).length === 0;
    }
    return true;
  },
};
