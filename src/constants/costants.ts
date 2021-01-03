import dressIcon from "../assets/icons/dress_icon.png"
import jacketIcon from "../assets/icons/jacket_icon.png"
import otherIcon from "../assets/icons/other_icon.png"
import pantIcon from "../assets/icons/pant_icon.png"
import shirtIcon from "../assets/icons/shirt_icon.png"
import tshirtIcon from "../assets/icons/tshirt_icon.png"

const clothSize = ["UNIQUE", "XS", "S", "M", "L", "XL"] // List of possible values for the size of a cloth.
const clothType = ["OTHER", "TSHIRT", "PANT", "JACKET", "DRESS", "SHIRT"] // List of possible values for the type of a cloth.
const clothStatus = ["SECOND_HAND", "UPCYCLED", "BRAND_NEW"] // List of possible values for the status of a cloth.
const clothTypesIcons = [otherIcon, tshirtIcon, pantIcon, jacketIcon, dressIcon, shirtIcon] // List of possible icons for each cloth type.

export {
    clothType,
    clothSize,
    clothStatus,
    clothTypesIcons
}
