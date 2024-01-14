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
}

export default new BookingController();

// typesService = [
//     { title: 'Servicio 1', description: 'Descripción del servicio 1' },
//     { title: 'Servicio 2', description: 'Descripción del servicio 2' },
//     { title: 'Servicio 3', description: 'Descripción del servicio 3' },
// ];

// availableTimes = [

//     { serviceId: 1, date: '2023-08-07', hour: '10:00', available: true },
//     { serviceId: 1, date: '2023-08-07', hour: '12:00', available: false },
//     { serviceId: 1, date: '2023-08-07', hour: '14:00', available: true },
//     { serviceId: 1, date: '2023-08-07', hour: '15:00', available: false },

//     { serviceId: 1, date: '2023-08-09', hour: '10:00', available: true },
//     { serviceId: 1, date: '2023-08-09', hour: '13:00', available: true },

//     { serviceId: 1, date: '2023-08-10', hour: '14:00', available: true },
//     { serviceId: 1, date: '2023-08-10', hour: '16:00', available: false },

//     { serviceId: 1, date: '2023-08-11', hour: '10:00', available: true },
//     { serviceId: 1, date: '2023-08-12', hour: '10:00', available: false },
//     { serviceId: 1, date: '2023-08-13', hour: '10:00', available: false },
// ];