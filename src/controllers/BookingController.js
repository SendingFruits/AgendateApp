// import ServiceModel from '../models/ServiceModel';
import BookingServices from '../services/BookingServices';
import { getFormattedDate } from '../views/utils/Functions'; 

class BookingController {

    getBookingsForCustomer = async (guid) => {
		return new Promise((resolve, reject) => {
			// console.log('guid', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe existir un Cliente.');
			}

			BookingServices.getBookings(guid, null, 'Clientes')
			.then(bookingsReturn => {
				// console.log('bookingsReturn', bookingsReturn);
				if (bookingsReturn !== null) {
					resolve(bookingsReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getBookingsForCustomer '+ error);
			});
		});
    };

    getBookingsForCompany = async (guid, date) => {
		return new Promise((resolve, reject) => {
			// console.log('getSchedulesForService', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe existir una Empresa.');
			}
			if (date === null) {
				date = getFormattedDate();
			}

			BookingServices.getBookings(guid, date, 'Empresas')
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getBookingsForCompany', error);
			});
		});
    };


	handleCreateBooking(data) {
		return new Promise((resolve, reject) => {
			
			console.log('data: ', data);
			// if (data.username == '') {
			// 	throw new Error('Por favor ingrese el username.');
			// }
		
			var dataConvert = {};
			// var fechaHoraTurno = data.fechaHoraTurno.replace('T',' ');

			dataConvert = {
				idCliente: data.idCliente,
				idServicio: data.idServicio,
				fechaHoraTurno: data.fechaHoraTurno+'.000Z',
				estado: data.estado,
			}

			// console.log('dataConvert: ', dataConvert);

			BookingServices.postBooking(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleCancelBooking(guid) {
		return new Promise((resolve, reject) => {
			
			BookingServices.putBookingStatus(guid, 'cancel')
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleDoneBooking(guid) {
		return new Promise((resolve, reject) => {
			
			BookingServices.putBookingStatus(guid, 'done')
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

export default new BookingController();

