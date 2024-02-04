import { 
	useState
} from 'react';

import { 
    TextInput, 
    StyleSheet, 
    View,
    TouchableOpacity
} from 'react-native';

import { 
	faSearch,
} from '@fortawesome/free-solid-svg-icons';

import { 
	FontAwesomeIcon 
} from '@fortawesome/react-native-fontawesome';

import { LinearGradient } from 'expo-linear-gradient';

const SearchPanel = ( params ) => {

    var {
        onSearch,
        mapRef,
        width,
		height,
    } = params;

    const styles = StyleSheet.create({
        gradient: {
            width:width-120,
            height:35,
            position:'relative',
            top: 15,
            left: 0,
            right: 0,
            bottom: 0,
            marginVertical:20,
            marginHorizontal:100,
            borderWidth: 0.8,
            borderColor:'#393',
            borderRadius: 10,
        },
        input: {
            top: 2.2,
            padding: 10,
        },
        icon: {
            
        }
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };
    
    // return (
    //     // <LinearGradient colors={['#dfe4ff', '#238162', '#2ECC71']} >
    //         <View style={styles.searchPanel}>
    //             <LinearGradient colors={['#dfe4ff', '#238162', '#2ECC71']} ></LinearGradient>
    //             <TextInput
    //                 style={styles.input}
    //                 // placeholder="Buscar Empresa"
    //                 value={searchQuery}
    //                 onChangeText={setSearchQuery}
    //                 />
    //             {/* <Button title="Buscar" color="#69ACDD" onPress={handleSearch} /> */}
    //         </View>
    //     // </LinearGradient>
    // );

    return (
        <LinearGradient colors={['#dfe4ff', '#ffffee']} style={styles.gradient}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                <TextInput
                    style={styles.input}
                    // value={null}
                    onChangeText={setSearchQuery}
                    placeholder="Buscar Empresa"
                    backgroundColor="transparent"
                    placeholderTextColor="#060"// Puedes ajustar el color del texto del marcador de posición
                />
                <TouchableOpacity
                    style={{ marginEnd:20 }}
                    onPress={ () => handleSearch() }
                    >
                    <FontAwesomeIcon icon={faSearch} style={{color:'#060'}} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}



export default SearchPanel;