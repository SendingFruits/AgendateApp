import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
	typesService, 
	availableTimes
} from '../../controllers/MakeReservation';

import AlertModal from '../utils/AlertModal';
import ScheduleList from './ScheduleList';

const CalendarPicker = () => {

    const [selectedDate, setSelectedDate] = useState(null);
	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isScheduleListVisible, setScheduleListVisible] = useState(false);

    const markedDates = {};
    const disabledDates = {};

    availableTimes.forEach(horario => {
        // console.log(horario);
        const { date, available } = horario;
        markedDates[date] = { 
            selected: true, 
            marked: true, 
            dotColor: available ? 'green' : 'red',
            selectedColor : available ? 'green' : 'red',
        };

        if (!available) {
            disabledDates[date] = { disabled: true };
        }
    });

    const handleDateSelect = (day) => {
        
        // var isBusy = false;
        // for (var key in availableTimes) {
        //     console.log(day.dateString);
        //     console.log(availableTimes);
        //     if (day.dateString == availableTimes[key].date) {
        //         isBusy = true;
        //         break;
        //     }
        // }
       
        // if (!isBusy) {
            setSelectedDate(day.dateString);
            setTimePickerVisible(true);
            setScheduleListVisible(true); 
        // } else {
        //     AlertModal.showAlert('Dia Ocupado');
        // }
    
    };

	return ( 
        <View>
            <Calendar
                style={styles.calendar}
                // disableTouchEvent={false}
                markedDates = {markedDates}
                onDayPress={(day) => handleDateSelect(day)}
                markingType="multi-dot"
                disabledDates={disabledDates}
            />

            {isScheduleListVisible && (
                <ScheduleList
                    availableTimes={availableTimes}
                    selectedDate={selectedDate}
                />
            )}
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
		backgroundColor: '#e3e0ef',
	},
});

export default CalendarPicker;