import Web3 from "web3"

/**
 * JS Object which contains the configuration of the dApp environment (Web3Provider, smart contract addresses, production mode flag).
 */
export default {
    // ReclothesShop SC address for development environment.
    RECLOTHES_SHOP_ADDRESS_DEV: "YOUR-RECLOTHES-SHOP-DEV-ADDRESS-HERE",
    // ReclothesShop SC address for production environment.
    RECLOTHES_SHOP_ADDRESS_PROD: "YOUR-RECLOTHES-SHOP-PROD-ADDRESS-HERE",
    // ResellingCredit SC address for development environment.
    RESELLING_CREDIT_ADDRESS_DEV: "YOUR-RESELLING-CREDIT-DEV-ADDRESS-HERE",
    // ResellingCredit SC address for production environment.
    RESELLING_CREDIT_ADDRESS_PROD: "YOUR-RESELLING-CREDIT-PROD-ADDRESS-HERE",
    // Returns MetaMask/Mist default provider.
    WEB3_PROVIDER: new Web3(Web3.givenProvider),
    // Your production network (e.g., ropsten, goerli, rinkeby, besu, ...).
    PROD_NETWORK_TYPE: "besu",
    // Your production chain/network id (e.g., 3 -> Ropsten, 2018 -> Besu).
    PROD_NETWORK_ID: 2018,
    // Your development network type.
    DEV_NETWORK_TYPE: "private",
    // True when using production mode, otherwise false for development mode.
    PROD_NET_MODE: false
}
