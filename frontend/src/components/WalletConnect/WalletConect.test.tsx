import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../../redux/slices/wallet/walletSlice';
import WalletConnect from './WalletConnect';

describe('WalletConnect Component', () => {
  const renderWithStore = (initialState: unknown) => {
    const store = configureStore({
      reducer: {
        wallet: walletReducer,
      },
      preloadedState: initialState,
    });

    return {
      store,
      ...render(
        <Provider store={store}>
          <WalletConnect />
        </Provider>
      ),
    };
  };

  it('should render the "Connect Wallet" button when no address is connected', () => {
    const initialState = {
      wallet: {
        address: null,
        balance: null,
        error: null,
        isLoading: false,
      },
    };

    renderWithStore(initialState);

    // Verify the "Connect Wallet" button is displayed
    const connectButton = screen.getByText('Connect Wallet');
    expect(connectButton).toBeInTheDocument();
  });

  // it('should dispatch connectWalletRequest when "Connect Wallet" button is clicked', () => {
  //   const initialState = {
  //     wallet: {
  //       address: null,
  //       balance: null,
  //       error: null,
  //       isLoading: false,
  //     },
  //   };

  //   const { store } = renderWithStore(initialState);

  //   // Simulate clicking the connect button
  //   const connectButton = screen.getByText('Connect Wallet');
  //   fireEvent.click(connectButton);

  //   // Verify that connectWalletRequest was dispatched
  //   const actions = store.getActions();
  //   expect(actions).toEqual(expect.arrayContaining([{ type: 'wallet/connectWalletRequest' }]));
  // });

  it('should display wallet address and balance when connected', () => {
    const initialState = {
      wallet: {
        walletAddress: '0x123',
        balance: '1.5',
        error: null,
        isLoading: false,
      },
    };

    renderWithStore(initialState);

    // Verify wallet address and balance are displayed
    expect(screen.getByText(/Wallet Address: 0x123/i)).toBeInTheDocument();
    expect(screen.getByText(/Balance: 1.5 ETH/i)).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    const initialState = {
      wallet: {
        address: null,
        balance: null,
        error: 'An error occurred',
        isLoading: false,
      },
    };

    renderWithStore(initialState);

    // Verify the error message is displayed
    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });

  it('should disable the "Connect Wallet" button when loading', () => {
    const initialState = {
      wallet: {
        address: null,
        balance: null,
        error: null,
        isLoading: true,
      },
    };

    renderWithStore(initialState);

    // Verify the button is disabled
    const connectButton = screen.getByText('Connecting...');
    expect(connectButton).toBeDisabled();
  });
});
