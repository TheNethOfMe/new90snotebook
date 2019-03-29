export default (array, newObject) => {
  return array.map(obj => (newObject.id === obj.id ? newObject : obj));
};
