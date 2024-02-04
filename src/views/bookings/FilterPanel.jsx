import { formatDate, getFormattedDate } from '../../views/utils/Functions'; 
import CalendarPicker from '../bookings/CalendarPicker'

import { 
	useState
} from 'react';

import { 
    Modal,
    Text,
    TextInput, 
    StyleSheet, 
    View,
    TouchableOpacity
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { LinearGradient } from 'expo-linear-gradient';

const FilterPanel = ( params ) => {

    // console.log(params);
    var {
        onRefresh,
        dateSelected,
        setDateSelected,
        showModal,
        setShowModal
	} = params;

    const showCalendar = () => {
        setShowModal(true);      
        console.log(showModal)
    }
 
    return (
        <>
            <LinearGradient 
                style={styles.container}
                colors={['#dfe4ff', '#238162', '#135054']} >

                <TouchableOpacity     
                    style={styles.searchPanel}
                    onPress={() => showCalendar()}>
             
                    <TextInput 
                        editable={false}
                        style={styles.dataEdit} 
                        value={formatDate(dateSelected)}
                        />
                    
                </TouchableOpacity>
            </LinearGradient>

            <Modal
                animationType="slide"
                visible={showModal}
                transparent={true} >
                <View style={styles.modal}>

                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => setShowModal(false)} >
                        <Text style={styles.cross}>X</Text>
                    </TouchableOpacity>
                    <CalendarPicker 
                        onRefresh={onRefresh}
                        setShowModal={setShowModal}
                        selectedDate={dateSelected}
                        setSelectedDate={setDateSelected}
                        />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: { 
        width:'98%', 
        height:50, 
        alignItems:'center',
        alignContent:'center', 
        flexDirection:'row',
        position:'absolute',
        top:2,
    },
    searchPanel: {
        flex: 1,
        width: '99%',
        height: 33,
        zIndex: 10, 
        marginHorizontal:20,
        backgroundColor:'#fff'
    },
    dataEdit: {
        flex: 1,
        marginVertical:5,
        marginHorizontal:8,
        backgroundColor:'#fff'
    },
    modal: {
		width: 200,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		// borderColor: 'green',
		// borderWidth: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
		position: 'absolute',
		top: -65,
		right: -25,
        // bottom: 0,
		borderRadius: 15,
		// width: 30,
		// height: 30,
		justifyContent: 'center',
		alignItems: 'center',

	},
	cross: {
		color: 'green',
	},
});

/**
 *  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display="spinner"
        is24Hour={true}
        date = {new Date()}
        minuteInterval={30}
        onConfirm={(date) => setDateSelected(date)}
        onCancel={() => setDatePickerVisibility(false)}
        />
 */

export default FilterPanel;