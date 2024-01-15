// import ServiceModel from '../models/ServiceModel';
// import UsersController from '../../controllers/UsersController';

class BookingController {

    getBookingsForCustomerJSON = async (customer) => {
        const bookingsList = databaseData.Bookings;
        const bookingsForCustomer = bookingsList.filter(booking => {
            return booking.Customer.UserId === customer.UserId;
        });
        console.log('bookingsForCustomer:');
        console.log(bookingsForCustomer);
        return bookingsForCustomer
        // var list = BookingsServices.getBookings();
        // console.log(list);
        // return  list;
    };
    
    getBookingsForCustomer = async (guid) => {
		return new Promise((resolve, reject) => {
			// console.log('getSchedulesForService', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe existir un servicio.');
			}

			BookingServices.getSchedulesOfServices(guid, date)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getBookingsForCustomer', error);
			});
		});
    };

	handleCreateBooking(data) {
		return new Promise((resolve, reject) => {
			
			if (data.username == '') {
				throw new Error('Por favor ingrese el username.');
			}
			if (data.password == '') {
				throw new Error('Por favor ingrese la contraseña.');
			}
		
			var dataConvert = {};
			
		
			dataConvert = {
				rutDocumento: data.document,
				razonSocial: "",
				nombrePropietario: data.firstName + ' ' + data.lastName,
				rubro: "",
				direccion: "",
				ciudad: "",
				descripcion: "",
				latitude: 0,
				longitude: 0,
			}

			UserServices.postUserRegister(dataConvert)
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

