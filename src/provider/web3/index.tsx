import React, { createContext, useEffect, useState } from "react";
import { createWeb3State, defaultState, Web3State } from "./utils";
import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

type Props = { children: React.ReactNode };

export const Web3Context = createContext<Web3State>(defaultState());

const Web3Provider = ({ children }: Props) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(defaultState());

  useEffect(() => {
    async function initWeb3() {
      const provider = await detectEthereumProvider({
        mustBeMetaMask: true,
      });

      if (provider) {
        const web3 = new providers.Web3Provider(provider);
        setWeb3Api(
          createWeb3State({
            isLoading: false,
            isInstallMetamask: true,
            provider: web3,
            ethereum: window.ethereum!,
          })
        );
      } else {
        setWeb3Api((prev) => ({
          ...prev,
          isLoading: false,
          isInstallMetamask: false,
        }));
      }
    }

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export default Web3Provider;
