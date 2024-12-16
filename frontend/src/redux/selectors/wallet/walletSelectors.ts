import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const selectWallet = (state: RootState) => state.wallet;

export const selectWalletAddress = createSelector(
  selectWallet,
  (wallet) => wallet.walletAddress
);

export const selectBalance = createSelector(
  selectWallet,
  (wallet) => wallet.balance
);

export const selectError = createSelector(
  selectWallet,
  (wallet) => wallet.error
);

export const selectIsLoading = createSelector(
  selectWallet,
  (wallet) => wallet.isLoading
);
