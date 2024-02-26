import { 
	useState, useEffect
} from 'react';

import { 
    StyleSheet, 
    View,
    Text
} from 'react-native';

import Slider from '@react-native-community/slider';

import { LinearGradient } from 'expo-linear-gradient';

const RatioPanel = ({ onRatioChange, mapRef }) => {

    const [ratio, setRatio] = useState(1);
    
    const handleRatioChange = (value) => {
        setRatio(value);
        // Llama a la función de devolución de llamada con el nuevo valor
        onRatioChange(value);
    };
  
    
    useEffect(() => {
		setRatio(1);
	}, []); // isConnected

    return (
        <View style={{ backgroundColor: '#fff', borderWidth: 0.4, borderColor: '#389338'}}>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={1}
                maximumValue={20}
                // minimumTrackTintColor="#FFFFFF"
                // maximumTrackTintColor="#000000"
                thumbTintColor="#389338" 
                step={1}
                onSlidingComplete={handleRatioChange}
            />
            <View style={styles.labels}>
                <Text style={styles.km}> 1 Km</Text>
                <Text style={styles.km}> 5 Km</Text>
                <Text style={styles.km}>10 Km</Text>
                <Text style={styles.km}>15 Km</Text>
                <Text style={styles.km}>20 Km</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ratioPanel: {
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
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
        marginLeft: 5,
        marginBottom: 6
    },
    km: {
        fontSize: 8
    }
});

export default RatioPanel;