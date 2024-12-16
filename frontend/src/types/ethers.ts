import { Eip1193Provider } from 'ethers';

export interface EthereumWindow extends Window {
  ethereum?: Eip1193Provider;
}
