import React, { 
    useState 
} from 'react';

import { 
    View, StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarSelector = ( params ) => {

	// console.log(LocaleConfig);
	const [list, setList] = useState(null);
	
	const { 
		setInforVisible, 
		setCalendarVisible,
		setSchedulesVisible,
		setSelectedDate,
		setAvailableTimes,
		setTimePickerVisible,
	} = params;

    var id_server = params.service.id;

    const markedDates = {};
    const disabledDates = {};

	LocaleConfig.locales['es']  = {
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		monthNamesShort: [
		  	'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Set', 'Oct', 'Nov', 'Dic',
		],
		dayNames: [
			'Domingo',
			'Lunes',
			'Martes',
			'Miercoles',
			'Jueves',
			'Viernes',
			'Sábado',
		],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Xer', 'Jue', 'Vie', 'Sab'],
		today: 'Hoja',
	};


    const getAsyncStorageData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        // console.log('values: ', values);
    } 

    const getCompanyData = async () => {
        var dataCompany = await AsyncStorage.getItem('dataCompany');
        console.log('dataCompany: ', dataCompany);
        if (dataCompany !== null) {
            var companyJSON = JSON.parse(dataCompany);
            // console.log('serviceJSON: ', serviceJSON);
            if (companyJSON !== null) {
                setCompanyData(companyJSON);
                // console.log('serverSelectId: ', serverSelectId);
            }
        }
    }

    const getServiceId = async () => {
        var selectedService = await AsyncStorage.getItem('selectedService');
        console.log('selectedService: ', selectedService);
        if (selectedService !== null) {
            var serviceJSON = JSON.parse(selectedService);
            // console.log('serviceJSON: ', serviceJSON);
            if (serviceJSON !== null) {
                setServerSelectId(serviceJSON.id);
                // console.log('serverSelectId: ', serverSelectId);
            }
        }
    }

    const handleDateSelect = (day) => {

        SchedulesController.getSchedulesForService(id_server,day.dateString)
        .then(schedulesReturn => {
            // console.log('schedulesReturn: ', schedulesReturn.resultado);        

            if (schedulesReturn !== null) {
                setAvailableTimes(schedulesReturn.resultado);    
            } else {
                setAvailableTimes([]);
            }

            setSelectedDate(day.dateString);
            setTimePickerVisible(true);

			setInforVisible(false);
			setCalendarVisible(false);
			setSchedulesVisible(true);
        })
        .catch(error => {
            // alert(error); 
			AlertModal.showAlert('Horarios ', error);
        });

    };

	return ( 
        <View>
            <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#000000',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'green',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                }}
                // disableTouchEvent={false}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
				// customHeader={({ date, onMonthChange }) => (
				// 	<CalendarHeader month={date} onMonthChange={onMonthChange} />
				// )}
            />
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
        // height: '25%',
		backgroundColor: '#e3e0ef',
	},
    title: {
		alignSelf:'center',
		marginTop: 3,
		padding: 2,
		color:'#000000',
		fontWeight:'bold',
		backgroundColor:'#e3eeee',
		width:'100%',
		textAlign:'center'
	},
	scheduleItem: {
		flexDirection: 'row',
		alignContent: 'space-between',
		paddingVertical: 4,
		paddingHorizontal: 20,
		marginTop: 5,
		marginBottom: 5,
		borderBottomColor: '#8DA9A4',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	hourItem: {
		fontWeight: 'normal',
		marginRight: 20,
	},
	statusItem: {
		alignSelf:'flex-end',
		fontWeight: 'bold',
		textAlign: 'right',
	},
	modal: {
		width: 360,
		height: 220,
		alignSelf: 'center',
		marginHorizontal: 40,
		marginVertical: 220,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 20,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
		position: 'absolute',
		top: 10,
		right: 10,
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',

	},
	cross: {
		color: 'green',
	},
	textConfirm: {
		fontSize: 21,
		textAlign: 'center',
		marginHorizontal: 2,
		marginVertical: 2,
		paddingHorizontal: 6,
		paddingVertical: 6,
	},
});

export default CalendarPicker;