import databaseData from '../services/database/database.json';
// import ServiceModel from '../models/ServiceModel';
// import UsersController from '../../controllers/UsersController';

class SchedulesController {

    getSchedulesForService(idService) {
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
}

export default new SchedulesController();