import { 
	useState
} from 'react';

import { 
    TextInput, 
    StyleSheet, 
    View,
    Button
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const SearchPanel = ({ onSearch, mapRef }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };
    
    return (
        <LinearGradient colors={['#dfe4ff', '#238162', '#2ECC71']} >
            <View style={styles.searchPanel}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar Empresa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    />
                <Button title="Buscar" color="#69ACDD" onPress={handleSearch} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    searchPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 9,
        
        borderColor: '#355B54',
        borderWidth: 1,
    },
    input: {
        width:'77%',
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
});

export default SearchPanel;