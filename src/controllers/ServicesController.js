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

	handleServiceUpdate(data) {
		return new Promise((resolve, reject) => {
		
			// if (data.rut == '') {
			// 	throw new Error('Falta el RUT.');
			// }
			// if (data.businessName == '') {
			// 	throw new Error('Falta el Razon Social.');
			// }
			// if (data.lastName == '') {
			// 	throw new Error('Falta el apellido.');
			// }

			console.log(data);

			var dataConvert = {
				rutDocumento: data.rut,
				razonSocial: data.businessName,
				// nombrePropietario: data.firstName + ' ' + data.lastName,
				rubro: data.category,
				direccion: data.address,
				ciudad: data.city,
				descripcion: data.description,
				latitude: data.latitude,
				longitude: data.longitude,

				// nombre: data.firstName,
				// apellido: data.lastName,
				// nombreUsuario: data.username,
				// contrasenia: data.password,
				// celular: data.movil,
				// correo: data.email,
				// tipoUsuario: data.userType
			}

			// {
			// 	"id": 0,
			// 	"nombreUsuario": "string",
			// 	"nombre": "string",
			// 	"apellido": "string",
			// 	"contrasenia": "string",
			// 	"celular": "string",
			// 	"correo": "string",
			// 	"tipoUsuario": "string",
			// 	"rutDocumento": "string",
			// 	"razonSocial": "string",
			// 	"nombrePropietario": "string",
			// 	"rubro": "string",
			// 	"direccion": "string",
			// 	"ciudad": "string",
			// 	"descripcion": "string",
			// 	"latitude": 0,
			// 	"longitude": 0
			//   }

			CompanyServices.putServiceData(dataConvert)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}


export default new ServicesController();