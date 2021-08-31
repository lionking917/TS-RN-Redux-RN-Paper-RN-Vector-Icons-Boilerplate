import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { notesReducer, settingsReducer } from './reducers';

const persistConfig = {
  key: 'notes',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ notesReducer, settingsReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
