import BookingServices from '../services/BookingServices';

class SchedulesController {

	getSchedulesForService(guid, date) {
		return new Promise((resolve, reject) => {

			// console.log('service', guid);
			// console.log('date', date);

			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe existir un servicio.');
			}
			if ((date == '') || (date == undefined)) {
				throw new Error('Debe existir una fecha.');
			}

			BookingServices.getSchedulesOfServices(guid, date)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				resolve(serviceReturn);
			})
			.catch(error => {
				reject(error.mensaje);
			});
		});
	}
}

export default new SchedulesController();