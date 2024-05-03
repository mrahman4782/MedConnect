import MultiSelect from 'react-native-multiple-select';
import { View, Text, } from 'react-native';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

const CustomMultiSelect = ({ items, value, setValue }) => {
    const [selectedItems, setSelectedItems] = useState([])

    onSelectItemChange = selectedItems => {
        setSelectedItems(selectedItems)
    }

    return (
        <View style={{ flex: 1 }}>
            <MultiSelect
                items={items}
                uniqueKey="label"
                onSelectedItemsChange={onSelectItemChange}
                selectedItems={selectedItems}
                selectText="SelectAllergies"
                searchInputPlaceholderText="Search Allergies..."
                displayKey="value"
                styleDropdownMenu={{ height: 60 }}
            />
        </View>
    )
}

export default CustomMultiSelect;