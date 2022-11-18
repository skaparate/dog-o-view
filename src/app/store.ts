import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import filtersSliceReducer from "../features/filters/filtersSlice";
import {breedsApi} from "../features/breeds/breedsApi";

export const store = configureStore({
    reducer: {
        filters: filtersSliceReducer,
        [breedsApi.reducerPath]: breedsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(breedsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
