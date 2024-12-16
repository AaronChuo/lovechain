import walletReducer, { setWalletAddress, setBalance, setError, setIsLoading } from './walletSlice';

describe('walletSlice', () => {
  const initialState = {
    walletAddress: null,
    balance: null,
    error: null,
    isLoading: false,
  };

  it('should handle setWalletAddress', () => {
    const newState = walletReducer(initialState, setWalletAddress('0x123'));
    expect(newState.walletAddress).toBe('0x123');
  });

  it('should handle setBalance', () => {
    const newState = walletReducer(initialState, setBalance('1.23'));
    expect(newState.balance).toBe('1.23');
  });

  it('should handle setError', () => {
    const newState = walletReducer(initialState, setError('Error occurred'));
    expect(newState.error).toBe('Error occurred');
  });

  it('should handle setIsLoading', () => {
    const newState = walletReducer(initialState, setIsLoading(true));
    expect(newState.isLoading).toBeTruthy();
  });
});
