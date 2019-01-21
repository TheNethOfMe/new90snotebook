// Users
export const fakeNewUser = {
  email: "reg@email.com",
  password: "123456",
  password2: "123456"
};

export const fakeExistingUser = {
  email: "bob@email.com",
  password: "123456"
};

// Error
export const fakeError = {
  response: {
    data: "You did a bad!"
  }
};

// Profile
export const fakeUserProfile = {
  user: fakeExistingUser,
  firstName: "Sparky",
  lastName: "McSparkerton",
  nickName: "The Spark",
  theme: "paper-cup",
  blacklist: [],
  searchableProfile: true,
  screenName: "Sparkster"
};
