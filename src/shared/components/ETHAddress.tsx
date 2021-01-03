import React from "react"
import { Typography } from "@material-ui/core"

type Props = {
    address: string, // The account address to display.
    start?: number,
    end?: number,
    chars?: number
}

/**
 * Display an Ethereum account address, either full or custom length.
 */
function ETHAddress ({ address, start = 0, end = 42, chars = 0 }: Props) {
    return (
        <Typography variant="body1" align="center">
            {(chars > 0) && `${address.slice(start, chars)}...${address.slice(end - chars, end)}`}
            {(chars === 0) && `${address}`}
        </Typography>
    )
}

export default ETHAddress
