const friendOrganizer = friends => {
  const resultList = {
    mutual: [],
    pending: [],
    received: []
  };
  friends.forEach(friend => {
    resultList[friend.status].push(friend);
  });
  return resultList;
};

export default friendOrganizer;
