import { selectWallet, selectWalletAddress, selectBalance, selectError, selectIsLoading } from './walletSelectors';

const mockState = {
  wallet: {
    walletAddress: '0x123',
    balance: '1.23',
    error: 'Error occurred',
    isLoading: false,
  },
};

describe('walletSelectors', () => {
  it('should select wallet state', () => {
    expect(selectWallet(mockState)).toEqual(mockState.wallet);
  });

  it('should select walletAddress', () => {
    expect(selectWalletAddress(mockState)).toBe('0x123');
  });

  it('should select balance', () => {
    expect(selectBalance(mockState)).toBe('1.23');
  });

  it('should select error', () => {
    expect(selectError(mockState)).toBe('Error occurred');
  });

  it('should select isLoading', () => {
    expect(selectIsLoading(mockState)).toBeFalsy();
  });
});
