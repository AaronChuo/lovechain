import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { BrowserProvider, formatEther } from 'ethers';
import {
  setWalletAddress,
  setBalance,
  setError,
  setIsLoading,
  connectWalletRequest,
  fetchBalanceRequest,
} from '../../redux/slices/wallet/walletSlice';
import { EthereumWindow } from '../../types/ethers';

const SUPPORTED_CHAIN_ID = 80001; // Polygon Mumbai Testnet

const ethereumWindow = window as EthereumWindow;

export function* connectWalletSaga(): SagaIterator {
  try {
    if (!ethereumWindow.ethereum) {
      yield put(setError('MetaMask is not installed'));
      return;
    }

    yield put(setIsLoading(true));

    const provider = new BrowserProvider(ethereumWindow.ethereum);
    const accounts: string[] = yield call(
      [provider, provider.send],
      'eth_requestAccounts', [],
    );
    const walletAddress = accounts[0];

    const network = yield call(
      [provider, provider.getNetwork]
    );
    const chainId: number = network.chainId;
    if (chainId !== SUPPORTED_CHAIN_ID) {
      yield put(setError('Unsupported network. Please switch to Polygon Mumbai.'));
      return;
    }

    yield put(setWalletAddress(walletAddress));
    yield put(fetchBalanceRequest(walletAddress));
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || 'Unable to connect wallet!';
    yield put(setError(errorMessage));
  } finally {
    yield put(setIsLoading(false));
  }
}

export function* fetchBalanceSaga(action: { payload: string }): SagaIterator {
  try {
    if (!ethereumWindow.ethereum) {
      yield put(setError('MetaMask is not installed'));
      return;
    }

    const provider = new BrowserProvider(ethereumWindow.ethereum);
    const balance: bigint = yield call(
      [provider, provider.getBalance],
      action.payload
    );
    const formattedBalance = formatEther(balance);
    yield put(setBalance(formattedBalance));
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || 'Unable to fetch balance!';
    yield put(setError(errorMessage));
  }
}

export default function* walletSaga(): SagaIterator {
  yield takeLatest(connectWalletRequest, connectWalletSaga);
  yield takeLatest(fetchBalanceRequest, fetchBalanceSaga);
}
