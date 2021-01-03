import React from "react"
import { Typography } from "@material-ui/core"

// Defining the TS type for every property passed as props.
type Props = {
    address: string,
    start?: number,
    end?: number,
    chars?: number
}

// Displays an Ethereum address passed in as props.
function ETHAddress ({ address, start = 0, end = 42, chars = 0 }: Props) {
    return (
        <Typography
            variant="body1"
            align="center"
        >
            {(chars > 0) && `${address.slice(start, chars)}...${address.slice(end - chars, end)}`}
            {(chars === 0) && `${address}`}
        </Typography>
    )
}

export default ETHAddress
