import { MultipleSelectList } from "react-native-dropdown-select-list";
import { View, Text } from 'react-native';
import { useState } from "react";

const CustomSelectList = ({ items, notFoundText }) => {
    const [selectedItem, setSelectedItem] = useState([])

    const onItemSelected = (value) => {
        setSelectedItem(value)
    }

    return (
        <MultipleSelectList
            setSelected={onItemSelected}
            data={items}
            save="value"
            notFoundText={notFoundText}
        />
    )

}

export default CustomSelectList