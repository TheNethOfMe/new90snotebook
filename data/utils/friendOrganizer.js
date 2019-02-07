const Profile = require("../models/Profile");

async const friendOrganizer = (friends, selfId) => {
  const resultList = {
    mutual: [],
    requested: [],
    recieved: []
  }
  friends.forEach(friend => {
    const newFriend;
    if (friend.mutual) {
      if (friend.requested === selfId) {
        newFriend = await Profile.findById(friend.recieved);
      } else {
        newFriend = await Profile.findById(friend.requested);
      }
      resultList.mutual.push(newFriend);
    } else if (friend.requested === selfId) {
      newFriend = await Profile.findById(friend.recieved);
      resultList.requested.push(newFriend);
    } else {
      newFriend = await Profile.findById(friend.requested);
      resultList.recieved.push(newFriend);
    }
  })
  return resultList;
}

export default friendOrganizer;