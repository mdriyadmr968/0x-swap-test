import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import QuoteView from './quote';
import PriceView from './price';

const Swap = () => { 
  const { address } = useAccount();

  const chainId = useChainId() || 137;
  console.log("chainId: ", chainId);

  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState();
  const [quote, setQuote] = useState();

  console.log("price", price);

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {finalize && price ? (
        <QuoteView
          takerAddress={address}
          price={price}
          quote={quote}
          setQuote={setQuote}
          chainId={chainId}
        />
      ) : (
        <PriceView
          takerAddress={address}
          price={price}
          setPrice={setPrice}
          setFinalize={setFinalize}
          chainId={chainId}
        />
      )}
    </div>
  );
}

export default Swap;

