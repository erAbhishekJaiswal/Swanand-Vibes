// // utils/localStorage.js
// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('cartState', serializedState);
//   } catch (e) {
//     console.error("Could not save state", e);
//   }
// };





// utils/localStorage.js

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

