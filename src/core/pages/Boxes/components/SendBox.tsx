import React, { useState } from "react"
import { getStackId } from "../../../../shared/utils/drizzle"
import SendBoxForm from "./SendBoxForm"
import { SecondHandClothesData } from "../../../../Types"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    handleClose: () => void // Callback for handling modal close.
}

/**
 * Manages the logic for displaying the form for sending a box of second-hand clothes.
 */
function SendBox ({ drizzle, userAccountAddress, handleClose }: Props) {
    const [stackId, setStackId] = useState<number>(0)

    // Callback function for sending a transaction.
    const sendTransaction = async (description: string, clothes: SecondHandClothesData[]) => {
        const contract = drizzle.contracts.ReclothesShop

        const clothTypesToSend: number[] = []
        const quantitiesToSend: number[] = []

        // Retrieving cloth type and quantity.
        clothes.forEach((cloth, i) => {
            if (cloth.quantity > 0) {
                clothTypesToSend.push(i)
                quantitiesToSend.push(cloth.quantity)
            }
        })

        // Transaction parameters array.
        const valuesToSend = [
            Math.trunc(Math.random() * 100000), // Pseudorandom id.
            description,
            clothTypesToSend,
            quantitiesToSend
        ]

        // Sending a cacheCall transaction.
        setStackId(
            await getStackId(
                drizzle.web3,
                contract,
                "sendBoxForEvaluation",
                contract.methods.sendBoxForEvaluation(...valuesToSend),
                valuesToSend,
                userAccountAddress
            )
        )
    }

    return (
        <div>
            <SendBoxForm handleClose={handleClose} sendTransaction={sendTransaction}></SendBoxForm>
        </div>
    )
}

export default SendBox
