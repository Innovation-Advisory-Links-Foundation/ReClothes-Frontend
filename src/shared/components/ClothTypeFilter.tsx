import { FormControl, InputLabel, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import Select from "@material-ui/core/Select/Select"

type Props = {
    onClothTypeFilterChange: (arg0: number) => void // Handler for cloth type filter changes.
}

/**
 * Implements filter logic based on the type of the cloth.
 */
function ClothTypeFilter ({ onClothTypeFilterChange }: Props) {
    const [clothType, setClothType] = useState<number>(6)  // Current cloth type.

    // Callback function for handling filter change events.
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setClothType(event.target.value as number)
        onClothTypeFilterChange(event.target.value as number)
    }

    return (
        <FormControl style={{ padding: "5px" }}>
            <InputLabel>Type</InputLabel>
            <Select
                value={clothType}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={0}>Other</MenuItem>
                <MenuItem value={1}>T-shirt</MenuItem>
                <MenuItem value={2}>Pant</MenuItem>
                <MenuItem value={3}>Jacket</MenuItem>
                <MenuItem value={4}>Dress</MenuItem>
                <MenuItem value={5}>Shirt</MenuItem>
                <MenuItem value={6}>All</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ClothTypeFilter
