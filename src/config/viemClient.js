const { createPublicClient, http } = require("viem");
const { mainnet } = require("viem/chains");

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL),
});

module.exports = client;
