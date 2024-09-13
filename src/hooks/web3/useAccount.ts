
import { useEffect } from 'react'
import { useWeb3 } from '../../provider/web3/hook'
import { useQuery } from '@tanstack/react-query'


const useAccount = () => {

    const { provider, ethereum } = useWeb3()

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["web3/useAccount"],
        queryFn: async () => {
            const accounts = await provider!.listAccounts()

            const account = accounts[0]
            if (!account) {
                throw "Cannot retrieve account! Connect to web3 wallet"
            }

            return { address: account }
        },
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged);
    }, [ethereum])



    const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts.length === 0) {
            window.location.reload();
        } else if (accounts[0] !== data?.address) {
            refetch();
        }
    };

    const connect = async () => {
        console.log('connect')
        try {
            await ethereum!.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            console.error('Error connecting to web3 wallet:', error)
        }
    }


    return { isLoading, account: data?.address, connect }

}

export default useAccount