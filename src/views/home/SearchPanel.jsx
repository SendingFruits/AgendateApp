import { 
	useState
} from 'react';

import { 
    Text, 
    TextInput, 
    StyleSheet, 
    View,
    Button
} from 'react-native';

const SearchPanel = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };
  
    return (
        <View style={styles.searchPanel}>
            <TextInput
                style={styles.input}
                placeholder="Buscar Empresa"
                value={searchQuery}
                onChangeText={setSearchQuery}
                />
            <Button title="Buscar" color="#69ACDD" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    searchPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 9,
        backgroundColor: '#2ECC71',
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
});

export default SearchPanel;