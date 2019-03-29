import store from "../store";

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

// Update a field in local store
export const updateLocalStorageStore = dataKey => {
  let currentData = JSON.parse(window.localStorage.getItem("My90sNBStore"));
  currentData[dataKey] = store.getState()[dataKey][dataKey];
  window.localStorage.setItem("My90sNBStore", JSON.stringify(currentData));
};

// Add or update theme for local storage
export const updateThemeForLocalStorage = decoded => {
  const currentStore = window.localStorage.getItem("My90sNBStore");
  if (!currentStore && !JSON.parse(currentStore).theme) {
    addToLocalStorageStore("theme", decoded.theme);
  } else {
    decoded.theme = JSON.parse(currentStore).theme;
  }
  return decoded;
};
