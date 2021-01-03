/** Custom helper methods for Drizzle */

/**
 * Execute a gas estimation for a given transaction. Detects reverts and runtime errors.
 * @param methodToCall The name of the smart contract method to call.
 * @param from The address of the transaction sender.
 * @param value An amount in wei to send with the transaction.
 */
const estimateTxGas = async (methodToCall: any, from: string, value: Number = 0) => {
    return Math.floor(
        await methodToCall.estimateGas({
            from,
            value
        }) * 1.5 // Nb. symbolic multiplier for avoiding problems for slightly unbalanced gas estimates.
    )
}

/**
 * Sends a contract transaction and return the stack id given by Drizzle to retrieve the value of the cached method.
 * To learn more visit https://www.trufflesuite.com/docs/drizzle/getting-started/contract-interaction.
 * @param web3 The web3 instance from the current provider.
 * @param contract The smart contract to call.
 * @param methodName The name of the method to call.
 * @param methodToCall The firm of the method to call.
 * @param values The parameters of the method to call (if any).
 * @param from The address of the transaction sender.
 * @param wei An amount in wei to send with the transaction.
 */
// Return the stack id used by Drizzle to retrieve the tx sent into the store stack.
const getStackId = async (
    web3: any,
    contract: any,
    methodName: string,
    methodToCall: () => {},
    values: (string | number | number[] | string[])[],
    from: string,
    wei: number = 0
) => {
    const gas = await estimateTxGas(methodToCall, from, wei) // Estimate the tx gas.
    const gasPrice = Number(await web3.eth.getGasPrice()) // Get current gas price.

    // Drizzle cacheSend method return a stack id so the status can be retrieved from the store when updates occurs.
    return contract.methods[methodName].cacheSend(
        ...values,
        {
            from,
            gas,
            gasPrice,
            value: wei
        }
    )
}

/**
 * Get the value returned from a cacheSend transaction reading the Drizzle state using the stack id.
 * To learn more visit https://www.trufflesuite.com/docs/drizzle/getting-started/contract-interaction.
 * @param drizzle The Drizzle instance object.
 * @param stackId The stack identifier for reading the returned value.
 */
const getTxStatus = (drizzle: any, stackId: number) => {
    const drizzleState = drizzle.store.getState() // Updated copy of the Drizzle state.
    const { transactions, transactionStack } = drizzleState // Get the transaction state from the drizzleState.
    const txHash = transactionStack[stackId] // Get the tx hash using the stackId.

    // If the tx hash doesn't exist, don't display anything.
    if (!txHash) { 
        return null 
    }

    // Otherwise, return the tx status.
    return transactions[txHash]
}

export { estimateTxGas, getStackId, getTxStatus }
