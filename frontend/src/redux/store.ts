import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/wallet/walletSlice';
import walletSaga from '../sagas/wallet/walletSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(walletSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
