import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectWalletRequest,
  fetchBalanceRequest,
} from '../../redux/slices/wallet/walletSlice';
import {
  selectWalletAddress,
  selectBalance,
  selectError,
  selectIsLoading,
} from '../../redux/selectors/wallet/walletSelectors';

const WalletConnect: React.FC = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector(selectWalletAddress);
  const balance = useSelector(selectBalance);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const connectWallet = () => {
    dispatch(connectWalletRequest());
  };

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchBalanceRequest(walletAddress));
    }
  }, [walletAddress, dispatch]);

  return (
    <div className="wallet-connect">
      <h1>Wallet Connect</h1>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="connect-button"
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WalletConnect;
