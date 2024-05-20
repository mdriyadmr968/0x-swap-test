import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";

const Send = () => {
  const erc20Abi = [
    // Include only the relevant ERC-20 ABI methods you need here.
    // The full ERC-20 ABI is not necessary for basic operations.
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
      type: "function",
    },
  ];

  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);

  const proxyContractAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const proxyAbi = [
    {
      inputs: [{ internalType: "address", name: "_proxyTo", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_new",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_old",
          type: "address",
        },
      ],
      name: "ProxyOwnerUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_new",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_old",
          type: "address",
        },
      ],
      name: "ProxyUpdated",
      type: "event",
    },
    { stateMutability: "payable", type: "fallback" },
    {
      inputs: [],
      name: "IMPLEMENTATION_SLOT",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "OWNER_SLOT",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "implementation",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "proxyOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "proxyType",
      outputs: [
        { internalType: "uint256", name: "proxyTypeId", type: "uint256" },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferProxyOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_newProxyTo", type: "address" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "updateAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_newProxyTo", type: "address" },
      ],
      name: "updateImplementation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.enable().then((accounts) => {
        setAccount(accounts[0]);

        const proxyContract = new web3Instance.eth.Contract(
          proxyAbi,
          proxyContractAddress
        );
        proxyContract.methods
          .implementation()
          .call()
          .then((implementationAddress) => {
            const tokenContract = new web3Instance.eth.Contract(
              erc20Abi,
              implementationAddress
            );
            setTokenContract(tokenContract);
          });
      });
    } else {
      setStatus("Please install MetaMask!");
    }
  }, []);

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setStatus("Please enter all fields.");
      return;
    }

    try {
      // const transaction = tokenContract.methods.transfer(
      //   recipient,
      //   Web3.utils.toWei(amount, "ether")
      // );

      const ethValue = ethers.parseUnits(amount.toString(), 6);
      const transaction = tokenContract.methods.transfer(recipient, ethValue);

      const gas = await transaction.estimateGas({ from: account });
      const gasPrice = await web3.eth.getGasPrice();

      transaction
        .send({
          from: account,
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
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>ERC20 Token Transfer</h1>
      <p>Connected Account: {account}</p>
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
  );
};

export default Send;
