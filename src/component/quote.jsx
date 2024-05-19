import { useEffect } from "react";
import { formatUnits } from "ethers";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { Address } from "viem";
import {
  POLYGON_TOKENS_BY_ADDRESS,
  AFFILIATE_FEE,
  FEE_RECIPIENT,
} from "./constants";
import qs from "qs";
import BigNumber from "bignumber.js";

export default function QuoteView({
  takerAddress,
  price,
  quote,
  setQuote,
  chainId,
}) {
  const sellTokenInfo = (chainId) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.sellTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  const buyTokenInfo = (chainId) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  // Fetch quote data
  useEffect(() => {
    const params = {
      sellToken: price.sellTokenAddress,
      buyToken: price.buyTokenAddress,
      sellAmount: price.sellAmount,
      takerAddress,
      feeRecipient: FEE_RECIPIENT,
      buyTokenPercentageFee: AFFILIATE_FEE,
      feeRecipientTradeSurplus: FEE_RECIPIENT,
    };

    async function main() {
      const res = await fetch(
        `https://polygon.api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
        {
          headers: {
            "0x-api-key": process.env.REACT_APP_ZEROEX_API_KEY,
            "0x-chain-id": chainId,
          },
        }
      );
      const data = await res.json();
      setQuote(data);
    }
    main();
  }, [
    price.sellTokenAddress,
    price.buyTokenAddress,
    price.sellAmount,
    takerAddress,
    setQuote,
    FEE_RECIPIENT,
    AFFILIATE_FEE,
  ]);

  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("sellAmount:", quote?.sellAmount);
  console.log("decimals:", sellTokenInfo(chainId).decimals);

  if (!quote) {
    return <div>Getting best quote...</div>;
  }

  console.log("quote", quote);

  return (
    <div className="p-3 mx-auto max-w-screen-sm ">
      <form>
        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-sm mb-3">
          <div className="text-xl mb-2 text-white">You pay</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <img
              alt={sellTokenInfo(chainId).symbol}
              className="h-9 w-9 mr-2 rounded-md"
              src={sellTokenInfo(chainId || 137)?.logoURI}
              style={{ width: "35px", height: "35px" }}
            />
            <span>
              {formatUnits(quote.sellAmount, sellTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{sellTokenInfo(chainId).symbol}</div>
          </div>
        </div>

        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-sm mb-3">
          <div className="text-xl mb-2 text-white">You receive</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <img
              alt={
                POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                  .symbol
              }
              className="h-9 w-9 mr-2 rounded-md"
              src={
                POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                  .logoURI
              }
            />
            <span>
              {formatUnits(quote.buyAmount, buyTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{buyTokenInfo(chainId).symbol}</div>
          </div>
        </div>

        <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-sm mb-3">
          {/* <div className="text-slate-400">
            {quote && quote.grossBuyAmount
              ? "Affiliate Fee: " +
                Number(
                  formatUnits(
                    new BigNumber(quote.grossBuyAmount),
                    buyTokenInfo(chainId).decimals
                  )
                ) *
                  AFFILIATE_FEE +
                " " +
                buyTokenInfo(chainId).symbol
              : null}
          </div> */}
          <div className="text-slate-400">
            {quote && quote.grossBuyAmount
              ? "Affiliate Fee: " +
                Number(
                  formatUnits(
                    BigInt(quote.grossBuyAmount),
                    buyTokenInfo(chainId).decimals
                  )
                ) *
                  AFFILIATE_FEE +
                " " +
                buyTokenInfo(chainId).symbol
              : null}
          </div>
        </div>
      </form>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        disabled={isPending}
        onClick={() => {
          console.log("submitting quote to blockchain");
          console.log("to", quote.to);
          console.log("value", quote.value);

          sendTransaction &&
            sendTransaction({
              gas: quote?.gas,
              to: quote?.to,
              value: quote?.value, // only used for native tokens
              data: quote?.data,
              gasPrice: quote?.gasPrice,
            });
        }}
      >
        {isPending ? "Confirming..." : "Place Order"}
      </button>
      <br></br>
      <br></br>
      <br></br>
      {isConfirming && (
        <div className="text-center">Waiting for confirmation ⏳ ...</div>
      )}
      {isConfirmed && (
        <div className="text-center">
          Transaction Confirmed! 🎉{" "}
          <a href={`https://polygonscan.com/tx/${hash}`}>Check Polygonscan</a>
        </div>
      )}
      {error && <div>Error: {error.shortMessage || error.message}</div>}
    </div>
  );
}
