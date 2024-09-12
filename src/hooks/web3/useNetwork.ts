/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useWeb3 } from "../../provider/web3/hook";
import { NETWORK_ID, TARGET_RPC } from "../../provider/web3/utils";
import { useQuery } from "@tanstack/react-query";


const useCorrectNetwork = () => {
    const { ethereum, provider } = useWeb3()

    const { data } = useQuery({
        queryKey: ['web3/connectNetwork'],
        queryFn: async () => {
            const chainId = (await provider?.getNetwork())?.chainId

            if (!chainId) {
                throw "Cannot retrieve network. Please, refresh your browser or connect to other network "
            }

            return { chainId: Number(chainId) }
        }
    })

    useEffect(() => {
        if (data?.chainId && data.chainId !== NETWORK_ID) {
            switchToCorrectNetwork()
        }
    }, [data?.chainId])


    async function switchToCorrectNetwork () {
        try {
            await ethereum!.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${NETWORK_ID.toString(16)}` }]
            })
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await ethereum!.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: `0x${NETWORK_ID.toString(16)}`,
                                rpcUrl: TARGET_RPC,
                            },
                        ],
                    });
                } catch (addError: any) {
                    console.log(addError)
                }
            } else {
                console.log(error)
            }
        }

    }
    return null
}

export default useCorrectNetwork