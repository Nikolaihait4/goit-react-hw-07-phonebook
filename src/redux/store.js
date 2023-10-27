import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactReduser';

export const rootReducer = combineReducers({
  contactsStore: contactsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
