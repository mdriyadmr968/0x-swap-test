import { useEffect, useState } from "react";
import { ethers } from "ethers";
import web3 from "web3";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";

const Send = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  // let contractAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"; //token contract address
  const { address } = useAccount();
  const chainId = useChainId() || 137;

  let NXC_Token_ABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_from",
          type: "address",
        },
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
  ];
  const getWeb3 = () => {
    if (window.ethereum) {
      let provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    } else {
      return false;
    }
  };

  const provider = getWeb3();

  const [isMetaMaskInstall, setIsMetaMaskInstall] = useState();
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(true);
  const [networkVersion, setNetworkVersion] = useState();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const setAccountDetails = async () => {
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      setIsMetaMaskConnected(false);
    } else {
      setIsMetaMaskConnected(true);
    }
  };
  // subscription for account change detection
  const accountChangeDetection = async () => {
    window.ethereum.on("accountsChanged", async function () {
      setIsDataLoading(true);
      await setAccountDetails().finally(() => setIsDataLoading(false));
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        await provider.send("eth_requestAccounts", []);
        setIsMetaMaskInstall(true);
        // first time set current network version Id.
        const { chainId } = await provider.getNetwork();
        setNetworkVersion(chainId);
        // first time call for load initial details
        await setAccountDetails();
        // subscription for account change detection
        await accountChangeDetection();
      } catch (e) {
        setIsMetaMaskInstall(false);
        setIsDataLoading(false);
        setIsMetaMaskConnected(false);
        const eMessage = e.message.split("{")[0] || "";
        console.log(eMessage);
      }
    };
    init().then((r) => setIsDataLoading(false));
  }, []);

  useEffect(() => {
    // Define the async function within useEffect
    const networkVersionChangeDetection = async () => {
      window.ethereum.on("chainChanged", function (networkId) {
        setNetworkVersion(Number(networkId));
      });
    };

    // Call the async function
    networkVersionChangeDetection();

    // Ensure proper cleanup to avoid memory leaks
    return () => {
      // Remove the listener if it's needed; replace with the appropriate cleanup code
      // window.ethereum.removeListener("chainChanged", networkVersionChangeDetection);
    };
  }, [networkVersion]);

  const handleTransfer = async () => {
    //Calling the metamask plugin
    const Web3 = new web3(window.ethereum);

    //convert the integer into Ether standard
    // const ethValue = ethers.utils.toWei(amount.toString(), "ether");

    // let eth = ethers.parseEther(amount.toString());
    // const ethValue = ethers.formatEther(eth);

    const ethValue = ethers.parseUnits(amount.toString(), 6);

    // const ethValueBigInt = 1n * 10n ** 6;
    //   const ethValue = Number(ethValueBigInt);

    //Intialize the contract
    var nxcTokenContract = new Web3.eth.Contract(NXC_Token_ABI, contractAddress, {
      from: address,
    });
    console.log("nxcTokenContract", nxcTokenContract);
    console.log("address", address);
    // Call the contract method transfer to send token to recipient id
    const transaction = nxcTokenContract.methods.transfer(
      recipient,
      ethValue
    );
    const gas = await transaction.estimateGas({
      from: address,
    });
    const gasPrice = await Web3.eth.getGasPrice();

    transaction
      .send({
        from: address,
        gas,
        gasPrice,
      })
      .on("transactionHash", (hash) => {
        setStatus(`Transaction sent! Hash: ${hash}`);
      })
      .on("receipt", (receipt) => {
        setStatus("Transfer successful");
      })
      .on("error", (error) => {
        setStatus(`Error: ${error.message}`);
      });
  };

  return (
    <div className="App">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ConnectButton />
      </header>

      <div>
        <h1>ERC20 Token Transfer</h1>
        <p>Connected Account: {address}</p>
        <input
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer</button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Send;
