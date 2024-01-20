import databaseData from '../services/database/database.json';
import BookingServices from '../services/BookingServices';

class SchedulesController {

    getSchedulesForServiceJSON(idService) {
		// json
		return new Promise((resolve, reject) => {
            // console.log('idService in controller: ', idService);
			var schedulesReturn = null;
			const schedulesList = databaseData.Schedules;
			// console.log(schedulesList);
			schedulesReturn = schedulesList.filter(schedule => schedule.serviceId === idService);
			// console.log(' - serviceReturn: ', schedulesReturn);
			resolve(schedulesReturn);
		});
	}

	getSchedulesForService(guid, date) {
		return new Promise((resolve, reject) => {
			// console.log('getSchedulesForService', guid);
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