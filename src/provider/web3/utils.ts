
import { Web3Dependencies } from "../../types"

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export type Web3State = {
    isLoading: boolean;
} & Nullable<Web3Dependencies>;

export const defaultState = () => ({
    ethereum: null,
    provider: null,
    isLoading: true,
    isInstallMetamask: false
})

export const createWeb3State = ({
    ethereum,
    isLoading,
    provider,
    isInstallMetamask
}: Web3Dependencies) => {
    return ({
        ethereum,
        isLoading,
        provider,
        isInstallMetamask
    })
}

export const NETWORK_ID = 80002
export const TARGET_RPC = 'https://rpc-amoy.polygon.technology'

