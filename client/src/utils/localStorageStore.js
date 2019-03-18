// import store from "../store";
// import { populateProfileFromStorage } from "../actions/profileActions";
// import { populateNotificationsFromStorage } from "../actions/notificationActions";
// import { populateFriendsFromStorage } from "../actions/friendActions";

// Empty the local store on logout
export const emptyLocalStore = () => {
  window.localStorage.removeItem("My90sNBStore");
  console.log("Local Storage Clear");
};

// Add new field to local store as they are loaded on login
export const addToLocalStorageStore = (dataKey, dataValue) => {
  let currentData = !!window.localStorage.getItem("My90sNBStore")
    ? JSON.parse(window.localStorage.getItem("My90sNBStore"))
    : {};
  currentData[dataKey] = dataValue;
  window.localStorage.setItem("My90sNBStore", JSON.stringify(currentData));
};

// Repopulate everything from local store on reload
// export const reloadFromStore = async () => {
//   console.log("Get from local store");
//   const savedLocalStore = JSON.parse(
//     window.localStorage.getItem("My90sNBStore")
//   );
//   populateProfileFromStorage(savedLocalStore.profile);
//   populateNotificationsFromStorage(savedLocalStore.notifications);
//   populateFriendsFromStorage(savedLocalStore.friends);
//   console.log(store.getState());
// };
