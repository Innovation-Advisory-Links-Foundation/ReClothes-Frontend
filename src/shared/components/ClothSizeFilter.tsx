import { FormControl, InputLabel, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import Select from "@material-ui/core/Select/Select"

type Props = {
    onClothSizeFilterChange: (arg0: number) => void // Handler for cloth size filter changes.
}

/**
 * Implements filter logic based on the size of the cloth.
 */
function ClothSizeFilter ({ onClothSizeFilterChange }: Props) {
    const [clothSize, setClothSize] = useState<number>(6) // Current cloth size.

    // Callback function for handling filter change events.
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setClothSize(event.target.value as number)
        onClothSizeFilterChange(event.target.value as number)
    }

    return (
        <FormControl style={{ padding: "5px" }}>
            <InputLabel>Size</InputLabel>
            <Select
                value={clothSize}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={0}>Unique</MenuItem>
                <MenuItem value={1}>XS</MenuItem>
                <MenuItem value={2}>S</MenuItem>
                <MenuItem value={3}>M</MenuItem>
                <MenuItem value={4}>L</MenuItem>
                <MenuItem value={5}>XL</MenuItem>
                <MenuItem value={6}>All</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ClothSizeFilter
