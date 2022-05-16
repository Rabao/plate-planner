import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'persist-store',
  storage,
  timeout:null,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,applyMiddleware(thunk,logger))
const persistor = persistStore(store)

export default store
export {persistor}
