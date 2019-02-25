const Profile = require("../models/Profile");

async function friendOrganizer(friends, selfId) {
  const resultList = {
    mutual: [],
    requested: [],
    recieved: []
  };
  friends.forEach(friend => {
    let newFriend;
    if (friend.mutual) {
      if (friend.requested === selfId) {
        newFriend = Profile.findById(friend.recieved);
      } else {
        newFriend = Profile.findById(friend.requested);
      }
      newFriend.then(f => {
        resultList.mutual.push(f);
      });
    } else if (friend.requested === selfId) {
      newFriend = Profile.findById(friend.recieved);
      newFriend.then(f => {
        resultList.requested.push(f);
      });
    } else {
      newFriend = Profile.findById(friend.requested);
      newFriend.then(f => {
        resultList.recieved.push(f);
      });
    }
  });
  return resultList;
}

module.exports = friendOrganizer;
