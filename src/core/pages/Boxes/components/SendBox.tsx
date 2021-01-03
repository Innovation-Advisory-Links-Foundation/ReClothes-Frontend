import React, { useState } from "react"
import { getStackId } from "../../../../shared/utils/drizzle"
import SendBoxForm from "./SendBoxForm"

// Defining the TS type for every property passed as props.
type Props = {
    drizzle: any, // Drizzle initialized instance.
    handleClose: () => void,
    userAccountAddress: string
}

function SendBox ({ drizzle, handleClose, userAccountAddress }: Props) {
    // eslint-disable-next-line
    const [stackId, setStackId] = useState(0)

    const sendTransaction = async (description: string, clothes: (({clothType: string, quantity: number})[])) => {
        const contract = drizzle.contracts.ReclothesShop

        const clothTypesToSend: number[] = []
        const quantitiesToSend: number[] = []

        // @ts-ignore
        clothes.forEach((cloth, i) => {
            if (cloth.quantity > 0) {
                clothTypesToSend.push(i)
                quantitiesToSend.push(cloth.quantity)
            }
        })

        // Id semi rand, desc, clothType [0,1,2], quantities [ 10,20,30]
        const valuesToSend = [
            Math.trunc(Math.random() * 100000), // Pseudorandom id.
            description, // Desc
            clothTypesToSend,
            quantitiesToSend
        ]

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
