import useAccount from "../hooks/web3/useAccount";
import { Button } from "./ui/button";

const Account = () => {
  const { account, isLoading, connect } = useAccount();
  console.log({ account, isLoading });
  return (
    <div>
      {account ? (
        <div className="text-bold text-2xl">Address: {account}</div>
      ) : (
        <Button onClick={connect}>Connect</Button>
      )}
    </div>
  );
};

export default Account;
