const express = require("express");
const client = require("../config/viemClient");
const { erc20Abi, formatUnits } = require("viem");

const router = express.Router();

router.get("/:tokenAddress", async (req, res, next) => {
  const { tokenAddress } = req.params;

  try {
    const [totalSupply, decimals] = await Promise.all([
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      }),
    ]);

    res.json({
      totalSupply: formatUnits(totalSupply),
      decimals,
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:tokenAddress/owners/:ownerAddress/balances",
  async (req, res, next) => {
    try {
      const { ownerAddress, tokenAddress } = req.params;

      const balance = await client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [ownerAddress],
      });

      res.json({
        balance: formatUnits(balance),
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
