import databaseData from '../services/database/database.json';
import CompanyServices from '../services/CompanyServices';
import SQLiteHandler from '../services/database/SQLiteHandler';

class ServicesController {

	getServicesForCompanyJson(guid) {
		return new Promise((resolve, reject) => {
			var serviceReturn = null;
			const servicesList = databaseData.Services;
			serviceReturn = servicesList.filter(serv => serv.idCompany === parseInt(guid));
			resolve(serviceReturn); // porque es uno solo
		});
	}

	getServicesForCompany(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getServicesForCompany', guid);
			if (guid == '') {
				throw new Error('Debe pertenecer a una empresa.');
			}

			// CompanyServices.getServicesForCompany(guid)
			// .then(serviceReturn => {
			// 	resolve(serviceReturn);
			// })
			// .catch(error => {
			// 	reject('Error Controller getServicesForCompany', error);
			// });

			SQLiteHandler.selectServiciosEmpresa(guid)
			.then(serviceReturn => {
				resolve(serviceReturn);
			})
			.catch(error => {
				reject('Error Controller selectServiciosEmpresa', error);
			});
		});
	}
}


export default new ServicesController();