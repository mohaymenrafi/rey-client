import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";
// import { persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
// 	key: "root",
// 	storage,
// };

// const rootReducer = combineReducers({
// 	user: userReducer,
// 	products: productsReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
// 	reducer: persistedReducer,
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({  serializableCheck: {
// ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// },
//  }),
// 	// devTools: process.env.NODE_ENV !== "production",
// });

// export const persistor = persistStore(store);
// ...

export const store = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
