import { MetaMaskInpageProvider } from '@metamask/providers';
import { providers } from 'ethers';


export type Web3Dependencies = {
    provider: providers.Web3Provider;
    ethereum: MetaMaskInpageProvider;
    isLoading: boolean;
    isInstallMetamask: boolean;
}