import env from "./environment"
import ReclothesShop from "../assets/contracts/ReclothesShop.json"
import ResellingCredit from "../assets/contracts/ResellingCredit.json"

/**
 * Creation of the Drizzle options object used for initializing the Drizzle instance.
 * This object maintains a link with the ReClothes smart contracts and current network.
 * To learn more visit https://www.trufflesuite.com/docs/drizzle/reference/drizzle-options.
 */
export default async function getDrizzleOptions () {
    if (env.WEB3_PROVIDER.givenProvider) {
        // Retrieve ABI from smart contract.
        const ReclothesShopABI: any = ReclothesShop.abi
        const ResellingCreditABI: any = ResellingCredit.abi

        // Get smart contract instance at a given address.
        const ReclothesShopInstance = new env.WEB3_PROVIDER.eth.Contract(
            ReclothesShopABI,
            env.PROD_NET_MODE ? env.RECLOTHES_SHOP_ADDRESS_PROD : env.RECLOTHES_SHOP_ADDRESS_DEV,
            { }
        )

        const ResellingCreditInstance = new env.WEB3_PROVIDER.eth.Contract(
            ResellingCreditABI,
            env.PROD_NET_MODE ? env.RESELLING_CREDIT_ADDRESS_PROD : env.RESELLING_CREDIT_ADDRESS_DEV,
            { }
        )

        // Create a Drizzle SC instance.
        const ReclothesShopContract: any = {
            contractName: "ReclothesShop", // Unique identifier for the contract.
            web3Contract: ReclothesShopInstance
        }

        const ResellingCreditContract: any = {
            contractName: "ResellingCredit", // Unique identifier for the contract.
            web3Contract: ResellingCreditInstance
        }

        // Return the Drizzle options object.
        return {
            web3: {
                customProvider: env.WEB3_PROVIDER
            },
            contracts: [
                ReclothesShopContract,
                ResellingCreditContract
            ],
            events: { }
        }
    } else {
        // If no provider is injected, return an empty option object (i.e. no MetaMask installed).
        return {
            web3: {
                customProvider: env.WEB3_PROVIDER
            },
            contracts: [],
            events: {}
        }
    }
}
