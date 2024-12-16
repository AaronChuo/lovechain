import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  walletAddress: string | null;
  balance: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: WalletState = {
  walletAddress: null,
  balance: null,
  error: null,
  isLoading: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string | null>) {
      state.walletAddress = action.payload;
    },
    setBalance(state, action: PayloadAction<string | null>) {
      state.balance = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    connectWalletRequest(state) {
      // This action triggers the saga
    },
    fetchBalanceRequest(state, action: PayloadAction<string>) {
      // This action triggers the saga
    },
  },
});

export const {
  setWalletAddress,
  setBalance,
  setError,
  setIsLoading,
  connectWalletRequest,
  fetchBalanceRequest,
} = walletSlice.actions;

export default walletSlice.reducer;
