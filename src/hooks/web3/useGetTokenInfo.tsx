/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWeb3 } from "../../provider/web3/hook";
import { useQuery } from "@tanstack/react-query";
import {
  Multicall,
  ContractCallContext,
  ContractCallResults,
  CallReturnContext,
} from "ethereum-multicall";
import { providers } from "ethers";
import { ERC20_ABI } from "../../contracts/erc20.abi";
import useAccount from "./useAccount";

function formatData(data: CallReturnContext[]): { [key: string]: any } {
  let decimals = 1; // Default to 1 if decimals are not found

  // First, extract decimals from the data
  data.forEach((item) => {
    if (item.returnValues.length === 0) {
      throw new Error("Invalid ERC20 token address");
    }

    if (item.reference === "decimals") {
      decimals = Math.pow(10, item.returnValues[0]);
    }
  });

  return data.reduce((formattedData, item) => {
    if (item.reference === "balanceOf") {
      // Extract the hex value, convert to BigInt, then divide by decimals
      const balanceHex = item.returnValues[0].hex;
      const balance = BigInt(balanceHex) / BigInt(decimals);
      formattedData[item.reference] = balance.toString();
    } else {
      formattedData[item.reference] = item.returnValues[0];
    }
    return formattedData;
  }, {});
}

const useGetTokenInfo = (address?: string) => {
  const { provider } = useWeb3();

  const { account } = useAccount();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["web3/useGetTokenInfo", address, account],
    queryFn: async () => {
      const multicall = new Multicall({
        ethersProvider: provider as providers.Provider,
        tryAggregate: true,
      });

      const contractCallContext: ContractCallContext[] = [
        {
          reference: "erc20",
          contractAddress: address!,
          abi: ERC20_ABI,
          calls: [
            { reference: "name", methodName: "name", methodParameters: [] },
            { reference: "symbol", methodName: "symbol", methodParameters: [] },
            {
              reference: "decimals",
              methodName: "decimals",
              methodParameters: [],
            },
            {
              reference: "balanceOf",
              methodName: "balanceOf",
              methodParameters: [account],
            },
          ],
        },
      ];

      const result: ContractCallResults = await multicall.call(
        contractCallContext
      );
      console.log(result);

      return formatData(result.results.erc20.callsReturnContext);
    },
    enabled: Boolean(address) && Boolean(account),
    retry: () => false,
  });

  return { data, isLoading, error, refetch };
};

export default useGetTokenInfo;
