import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'conversation'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
