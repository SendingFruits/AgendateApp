import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';

import SchedulesController from '../../controllers/SchedulesController';
// import BookingController from '../../controllers/BookingController';

import AlertModal from '../utils/AlertModal';
import ScheduleList from './ScheduleList';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPicker = ( params ) => {

    console.log('params: ', params);

    var id_comp = params.companyData.id;

    const [serverSelectId, setServerSelectId] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState(null);

	const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isScheduleListVisible, setScheduleListVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);

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

    const getCompanyData = async () => {
        var dataCompany = await AsyncStorage.getItem('dataCompany_'+(id_comp.toString()));
        console.log('dataCompany: ', dataCompany);
    }

    const getServiceId = async () => {
        if (id_comp !== null && id_comp !== undefined) {
            var selectedService = await AsyncStorage.getItem('selectedService_'+(id_comp.toString()));
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
    }

    const handleDateSelect = (day) => {

        console.log(day.dateString);
        console.log(serverSelectId);

        SchedulesController.getSchedulesForService(serverSelectId,day.dateString)
		.then(schedulesReturn => {
			console.log('schedulesReturn: ', schedulesReturn);
			 
            if (schedulesReturn !== null) {
                setAvailableTimes(schedulesReturn);
                setIsLoading(false);
            }
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
            getCompanyData();
            setIsLoading(false);
            getServiceId();
            setIsLoadingSchedules(false);
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
                    monthNames={spanishMonthNames}
                />
            )}

            {isLoadingSchedules ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScheduleList
                    // userLogin={userLogin}
                    // item={availableTimes}
                    availableTimes={availableTimes}
                    selectedDate={selectedDate}
                    />
            )}
           
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