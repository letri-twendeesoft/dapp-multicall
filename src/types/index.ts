import { MetaMaskInpageProvider } from '@metamask/providers';
import { BrowserProvider} from 'ethers'


export type Web3Dependencies = {
    provider: BrowserProvider;
    ethereum: MetaMaskInpageProvider;
    isLoading: boolean;
    isInstallMetamask: boolean;
}