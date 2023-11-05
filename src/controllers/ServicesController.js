import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class ServicesController {

	getServicesForCompany(idCompany) {
		// json
		return new Promise((resolve, reject) => {
			var serviceReturn = null;
			const servicesList = databaseData.Services;
			serviceReturn = servicesList.filter(serv => serv.idCompany === parseInt(idCompany));
			resolve(serviceReturn[0]); // porque es uno solo
		});
	}
}

export default new ServicesController();