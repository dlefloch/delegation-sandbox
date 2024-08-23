import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import {
  getPimlicoBundlerUrl,
  DeleGator,
  PimlicoGasFeeResolver,
  PimlicoVerifyingPaymasterSponsor,
  MetaMaskDelegationStorage,
} from "@codefi/delegator-wagmi";

const apiKey = "<delegator-api-key>";
const apiKeyId = "<delegator-api-key-id>";
const pimlicoAPIKey = "04934065-c463-4009-8067-b3a8642c183f";
const delegationStorageApiUrl = "<delegation-storage-api-url>";

const bundlerUrl = getPimlicoBundlerUrl(sepolia, pimlicoAPIKey);

const gasFeeResolver = PimlicoGasFeeResolver({
  pimlicoAPIKey,
  inclusionSpeed: "fast",
});

const paymasterSponsor = PimlicoVerifyingPaymasterSponsor({
  pimlicoAPIKey,
});

const delegationStorage = MetaMaskDelegationStorage({
  apiKey,
  apiKeyId,
  apiUrl: delegationStorageApiUrl,
});

const deleGatorConnector = DeleGator({
  serviceUrl,
  chain,
  apiKey,
  apiKeyId,
  bundlerUrl,
  gasFeeResolver,
  paymasterSponsor,
  delegationStorage,
});

export const config = createConfig({
  chains: [sepolia],
  connectors: [deleGatorConnector],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});