import { testSaga } from 'redux-saga-test-plan';
import {
  setWalletAddress,
  setBalance,
  setError,
  setIsLoading,
  fetchBalanceRequest,
} from '../../redux/slices/wallet/walletSlice';
import { BrowserProvider, formatEther } from 'ethers';
import { connectWalletSaga, fetchBalanceSaga } from './walletSaga';

describe('Wallet Sagas', () => {
  describe('connectWalletSaga', () => {
    it('should handle missing MetaMask and dispatch setError', () => {
      testSaga(connectWalletSaga)
        .next()
        .put(setError('MetaMask is not installed'))
        .next()
        .isDone();
    });

    it('should connect wallet, validate network, and dispatch actions', () => {
      const mockAccounts = ['0x123'];
      const mockNetwork = { chainId: 80001 };

      testSaga(connectWalletSaga)
        .next()
        .put(setIsLoading(true))
        .next()
        .call([BrowserProvider.prototype, BrowserProvider.prototype.send], 'eth_requestAccounts', [])
        .next(mockAccounts)
        .call([BrowserProvider.prototype, BrowserProvider.prototype.getNetwork])
        .next(mockNetwork)
        .put(setWalletAddress('0x123'))
        .next()
        .put(fetchBalanceRequest('0x123'))
        .next()
        .put(setIsLoading(false))
        .next()
        .isDone();
    });

    it('should handle unsupported network and dispatch setError', () => {
      const mockAccounts = ['0x123'];
      const mockNetwork = { chainId: 1 }; // Unsupported chain ID

      testSaga(connectWalletSaga)
        .next()
        .put(setIsLoading(true))
        .next()
        .call([BrowserProvider.prototype, BrowserProvider.prototype.send], 'eth_requestAccounts', [])
        .next(mockAccounts)
        .call([BrowserProvider.prototype, BrowserProvider.prototype.getNetwork])
        .next(mockNetwork)
        .put(setError('Unsupported network. Please switch to Polygon Mumbai.'))
        .next()
        .put(setIsLoading(false))
        .next()
        .isDone();
    });

    it('should handle errors and dispatch setError', () => {
      const errorMessage = 'Unable to connect wallet!';

      testSaga(connectWalletSaga)
        .next()
        .throw(new Error(errorMessage))
        .put(setError(errorMessage))
        .next()
        .put(setIsLoading(false))
        .next()
        .isDone();
    });
  });

  describe('fetchBalanceSaga', () => {
    it('should fetch balance and dispatch setBalance', () => {
      const mockAddress = '0x123';
      const mockBalance = BigInt(1500000000000000000); // 1.5 ETH
      const formattedBalance = '1.5';

      testSaga(fetchBalanceSaga, { payload: mockAddress })
        .next()
        .call([BrowserProvider.prototype, BrowserProvider.prototype.getBalance], mockAddress)
        .next(mockBalance)
        .call(formatEther, mockBalance)
        .next(formattedBalance)
        .put(setBalance(formattedBalance))
        .next()
        .isDone();
    });

    it('should handle errors and dispatch setError', () => {
      const mockAddress = '0x123';
      const errorMessage = 'Unable to fetch balance!';

      testSaga(fetchBalanceSaga, { payload: mockAddress })
        .next()
        .throw(new Error(errorMessage))
        .put(setError(errorMessage))
        .next()
        .isDone();
    });
  });
});
