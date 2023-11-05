import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import SchedulesController from '../../controllers/SchedulesController';
// import BookingController from '../../controllers/BookingController';

import AlertModal from '../utils/AlertModal';
import ScheduleList from './ScheduleList';

const CalendarPicker = (service) => {

    var idService = service.idService;
    // console.log('idService: ', idService);

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState(null);

	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isScheduleListVisible, setScheduleListVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const markedDates = {};
    const disabledDates = {};

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
            // setAvailableTimes(day.dateString);

            setTimePickerVisible(true);
            setScheduleListVisible(true); 
        // } else {
        //     AlertModal.showAlert('Dia Ocupado');
        // }
    
    };

    useEffect(() => {
		SchedulesController.getSchedulesForService(idService)
		.then(schedulesReturn => {
			// console.log('schedulesReturn: ', schedulesReturn);
			 
            schedulesReturn.forEach(horario => {
                // console.log('horario: ', horario);
                const { date, available } = horario;
                // console.log(date);
                // console.log(available);
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

            setAvailableTimes(schedulesReturn);
			setIsLoading(false);
		})
		.catch(error => {
			setIsLoading(false);
			alert(error); 
		});
	}, []);

	return ( 
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Calendar
                    style={styles.calendar}
                    // disableTouchEvent={false}
                    markedDates = {markedDates}
                    onDayPress={(day) => handleDateSelect(day)}
                    markingType="multi-dot"
                    disabledDates={disabledDates}
                />
            )}

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