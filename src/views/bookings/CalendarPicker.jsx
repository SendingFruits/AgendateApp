import { formatDate, formatDate2 } from '../utils/Functions'

import React, { 
    useState, useEffect 
} from 'react';

import { 
    View, 
    StyleSheet, 
} from 'react-native';
import { Calendar } from 'react-native-calendars';



const CalendarPicker = ( params ) => {

    var {
		onRefresh,
        setShowModal,
        selectedDate,
        setSelectedDate,
	} = params;


    const markedDates = {};
    const disabledDates = {};

    const spanishMonthNames = {
        enero: 'Enero',
        febrero: 'Febrero',
        marzo: 'Marzo',
        abril: 'Abril',
        mayo: 'Mayo',
        junio: 'Junio',
        julio: 'Julio',
        agosto: 'Agosto',
        septiembre: 'Septiembre',
        octubre: 'Octubre',
        noviembre: 'Noviembre',
        diciembre: 'Diciembre',
    };

    
    const handleDateSelect = (day) => {
        var date = day.dateString;
        setSelectedDate(date);
		console.log(selectedDate);
        setShowModal(false);
		// onRefresh();
    };

	return ( 
        <View>
            <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: '#135054',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                }}
                // disableTouchEvent={false}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
                monthNames={spanishMonthNames}
            />
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
		// flex: 1,
		width:'100%',
        height: 320,
		backgroundColor:'#e3e0ef',
	}
});

export default CalendarPicker;