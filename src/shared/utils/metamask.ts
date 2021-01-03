/** Custom helper methods for MetaMask */

/**
 * Return true when a MetaMask account change occurs, otherwise false.
 * @param accounts The list of the new accounts addresses (after change).
 * @param address The current Ethereum account address (before change).
 */
const isAccountChanged = (accounts: any, address: string) => {
    if (accounts.length === 0) {
        // MetaMask is locked, or the user has not any account connected.
        return false
    } else if (accounts[0] !== address) {
        return true
    }
}

export { isAccountChanged }
