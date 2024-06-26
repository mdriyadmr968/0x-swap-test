import { Address } from "viem";

export const AFFILIATE_FEE = 0.01; // Percentage of the buyAmount that should be attributed to feeRecipient as affiliate fees
export const FEE_RECIPIENT = "0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917"; // The ETH address that should receive affiliate fees

export const POLYGON_EXCHANGE_PROXY =
  "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";

export const MAX_ALLOWANCE =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const POLYGON_TOKENS = [
  {
    chainId: 137,
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/polygon.png",
  },
  {
    chainId: 137,
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/USDC.png",
  },
  {
    chainId: 137,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
];

export const POLYGON_TOKENS_BY_SYMBOL = {
  matic: {
    chainId: 137,
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/polygon.png",
  },
  usdc: {
    chainId: 137,
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/USDC.png",
  },
  dai: {
    chainId: 137,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
};

export const POLYGON_TOKENS_BY_ADDRESS = {
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
    chainId: 137,
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/polygon.png",
  },
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": {
    chainId: 137,
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI:
      "https://talewallet-assets.s3.ap-southeast-1.amazonaws.com/token-icon/USDC.png",
  },
  "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": {
    chainId: 137,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
};
