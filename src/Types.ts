/**
 * Custom type definition for the ReClothes dApp.
 */

export type ClothData = {
    id: number
    price: number
    clothType: number
    clothSize: number
    clothStatus: number
    description: string
    buyer: string
    timestamp: number
    info: string
}

export type BoxData = {
    id: number
    timestamp: number
    numberOfClothTypes: number
    evaluationInToken: number
    description: string
    sender: string
}

export type SecondHandClothesData = {
    clothType: number
    quantity: number
}
