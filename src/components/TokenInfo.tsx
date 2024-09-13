import { ethers } from "ethers";
import useGetTokenInfo from "../hooks/web3/useGetTokenInfo";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

const TokenInfo = () => {
  const [input, setInput] = useState({ address: "", error: "" });
  const [address, setAddress] = useState("");

  const { data, error, isLoading } = useGetTokenInfo(address);

  useEffect(() => {
    if (input.address.length > 0) {
      if (ethers.utils.isAddress(input.address)) {
        setAddress(input.address);
      } else {
        setInput((prev) => ({ ...prev, error: "Invalid Ethereum address." }));
      }
    } else {
      setAddress("");
      setInput({ address: "", error: "" });
    }
  }, [input.address]);

  console.log({ data, error, isLoading });

  return (
    <div className="mt-6">
      <div>
        <Input
          value={input.address}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, address: e.target.value }))
          }
          className="text-black"
        />
        {input.error && <div className="text-red-600">{input.error}</div>}
        {error && <div className="text-red-600">{error.message}</div>}
      </div>
      {isLoading && <div>Loading Token Infomation</div>}
      {data && (
        <div>
          <h2 className="">Token Infomation:</h2>
          <div className="flex flex-col items-start justify-center">
            <div>Name: {data?.name}</div>
            <div>Symbol: {data?.symbol}</div>
            <div>Decimal: {data?.decimals}</div>
            <div>Balance: {data?.balanceOf}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenInfo;
