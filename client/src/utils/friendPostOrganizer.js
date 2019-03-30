const friendPostOrganizer = rawList => {
  let resultList = [];
  rawList.forEach(user => {
    const displayNick = user.postUserNick ? ` "${user.postUserNick}" ` : " ";
    const displayName = `${user.postUserFirst}${displayNick}${
      user.postUserLast
    }`;
    user.userPosts.forEach(post => {
      let postObj = {};
      postObj.id = post._id;
      postObj.name = displayName;
      postObj.color = post.color;
      postObj.content = post.content;
      postObj.time = new Date(post.createdAt);
      resultList.push(postObj);
    });
  });
  resultList.sort(function(a, b) {
    a = a.time;
    b = b.time;
    return a > b ? -1 : a < b ? 1 : 0;
  });
  return resultList;
};

export default friendPostOrganizer;
