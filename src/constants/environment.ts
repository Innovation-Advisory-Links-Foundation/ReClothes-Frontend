import Web3 from "web3"

/**
 * JS Object which contains the configuration of the dApp environment (Web3Provider, smart contract addresses, production mode flag).
 */
export default {
    // ReclothesShop SC address for development environment.
    RECLOTHES_SHOP_ADDRESS_DEV: "0x51009F67f8E21A0b23a56638c5Cb52cc071EAfbd",
    // ReclothesShop SC address for production environment.
    RECLOTHES_SHOP_ADDRESS_PROD: "0xDd0Bb239e2Ff5c7AA08720C4A92243d7D8203BbA",
    // ResellingCredit SC address for development environment.
    RESELLING_CREDIT_ADDRESS_DEV: "0x58F3B971314B3d90e9a757D340A2dB1a326a98ff",
    // ResellingCredit SC address for production environment.
    RESELLING_CREDIT_ADDRESS_PROD: "0x092F33c18Bc9f0Bf61ef7133eAf945900fDe9106",
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
