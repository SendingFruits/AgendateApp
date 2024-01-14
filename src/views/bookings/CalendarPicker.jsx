import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import SchedulesController from '../../controllers/SchedulesController';
// import BookingController from '../../controllers/BookingController';

import AlertModal from '../utils/AlertModal';
import ScheduleList from './ScheduleList';

const CalendarPicker = (service) => {

    var guid = service.idService;
    console.log('guid: ', guid);

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState(null);

	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isScheduleListVisible, setScheduleListVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const markedDates = {};
    const disabledDates = {};

    const handleDateSelect = (day) => {
        // console.log(day.dateString);
        SchedulesController.getSchedulesForService(guid,day.dateString)
		.then(schedulesReturn => {
			// console.log('schedulesReturn: ', schedulesReturn);
			 
            /**
             * esto serviria si quiero mostrar la disponibilidad en todo el mes
             */

            // schedulesReturn.forEach(horario => {
            //     // console.log('horario: ', horario);
            //     const { date, available } = horario;
            //     // console.log(date);
            //     // console.log(available);
            //     markedDates[date] = { 
            //         selected: true, 
            //         marked: true, 
            //         dotColor: available ? 'green' : 'red',
            //         selectedColor : available ? 'green' : 'red',
            //     };
            //     if (!available) {
            //         disabledDates[date] = { disabled: true };
            //     }
            // });

            setAvailableTimes(schedulesReturn);
			setIsLoading(false);
		})
		.catch(error => {
			setIsLoading(false);
			alert(error); 
		});
       
    
        setSelectedDate(day.dateString);
        setScheduleListVisible(true); 
        setTimePickerVisible(true);
    
    };

    useEffect(() => {
		setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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

            <ScheduleList
                availableTimes={availableTimes}
                selectedDate={selectedDate}
                />
        </View>
	);
};

const styles = StyleSheet.create({
	calendar: {
        // height: '50%',
		backgroundColor: '#e3e0ef',
	},
});

export default CalendarPicker;