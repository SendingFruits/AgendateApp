import React, { useState } from 'react';
import { 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';

const MultiPicker = ({ list, onSelectionChange }) => {

    const [selectedItems, setSelectedItems] = useState(list);

    const daysOfWeek = [
        'Lunes', 
        'Martes', 
        'Miercoles', 
        'Jueves', 
        'Viernes', 
        'Sabado', 
        'Domingo'
    ];

    const toggleItem = (item) => {
        const updatedItems = selectedItems.includes(item)
            ? selectedItems.filter((selectedItem) => selectedItem !== item)
            : [...selectedItems, item];

        // const updatedItems = [...selectedItems, item];
        const sortedItems = updatedItems.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));

        setSelectedItems(sortedItems);
        onSelectionChange(sortedItems);
    };

    // console.log('selectedItems: ', selectedItems);

    // var chosen = [];
    // if (selectedItems !== undefined && selectedItems !== '') {
    //     chosen = selectedItems.split(';')
    // }
    // console.log('chosen: ',chosen);

    return (
        <ScrollView style={{ width: '100%', maxHeight: 150, textAlign:'right' }}>
        {daysOfWeek.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => toggleItem(item)}
                style={{ backgroundColor: selectedItems.includes(item) ? 'lightblue' : 'white', }}
                >
                <Text>{item}</Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
    );
};

export default MultiPicker;