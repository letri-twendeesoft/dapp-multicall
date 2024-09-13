import Account from "./components/Account";
import TokenInfo from "./components/TokenInfo";
import useAccount from "./hooks/web3/useAccount";
import useCorrectNetwork from "./hooks/web3/useNetwork";
import { useWeb3 } from "./provider/web3/hook";

function App() {
  const { isInstallMetamask, isLoading } = useWeb3();
  const { account } = useAccount();

  useCorrectNetwork();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div className="text-3xl font-bold ">
          {!isInstallMetamask && (
            <div className="flex flex-col justify-center items-center gap-2">
              <p>MetaMask Wallet is not installed.</p>
              <p>Please install MetaMask to continue. </p>
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm"
                target="_blank"
              >
                You can download it from{" "}
                <span className="text-[#F2872E] cursor-pointer">here</span>
              </a>
            </div>
          )}
        </div>
        <Account />
        {account && <TokenInfo />}
      </div>
    </>
  );
}

export default App;
