import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import topPicksReducer from "../features/topPicks/topPicksSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	// blacklist: ["user"],
};

const userPersistConfig = {
	key: "user",
	storage,
	blacklist: ["accessToken"],
};

const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
	wishlist: wishlistReducer,
	cart: cartReducer,
	topPicks: topPicksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// export const store = configureStore({
// 	reducer: {
// 		user: userReducer,
// 		products: productsReducer,
// 		wishlist: wishlistReducer,
// 	},
// });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
