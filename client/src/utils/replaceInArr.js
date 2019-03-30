export default (array, newObject) => {
  let newArr = [];
  array.forEach(obj => {
    if (obj._id === newObject._id) {
      newArr.push(newObject);
    } else {
      newArr.push(obj);
    }
  });
  return newArr;
};
