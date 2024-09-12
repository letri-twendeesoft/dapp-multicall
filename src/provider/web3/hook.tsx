import { useContext } from "react"
import { Web3Context } from "."

export const useWeb3 = () => {
    const web3State = useContext(Web3Context)
    if(!web3State){
      throw new Error("")
    }
  
    return  web3State
  }