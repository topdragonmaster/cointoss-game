import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import user from "./login";
import game from "./game"

const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    user,
    game
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);

