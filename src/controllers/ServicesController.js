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
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe pertenecer a una empresa.');
			}

			CompanyServices.getServicesForCompany(guid)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getServicesForCompany', error);
			});

			// SQLiteHandler.selectServiciosEmpresa(guid)
			// .then(serviceReturn => {
			// 	resolve(serviceReturn);
			// })
			// .catch(error => {
			// 	reject('Error Controller selectServiciosEmpresa', error);
			// });
		});
	}

	handleServiceUpdate(data) {
		return new Promise((resolve, reject) => {
		
			if (data.nombre == '') {
				throw new Error('Falta el Nombre.');
			}
			if (data.tipo == '') {
				throw new Error('Falta el Tipo.');
			}
			if (data.comienzo == '') {
				throw new Error('Falta la hora de Comienzo.');
			}
			if (data.termino == '') {
				throw new Error('Falta la hora de Termino.');
			}
			if (data.dias == '') {
				throw new Error('Falta seleccionar los dias.');
			}

			console.log(data);

			var dataConvert = {	
				nombre: data.nombre,
				tipoServicio: data.tipo,
				costo: data.costo,
				horaInicio: data.comienzo,
				horaFin: data.termino,
				duracionTurno: data.turno,
				descripcion: data.descripcion,
				diasDefinidosSemana: data.dias,
				idEmpresa: data.guid
			}

			// {
			// 	"nombre": "string",
			// 	"horaInicio": 0,
			// 	"horaFin": 0,
			// 	"diasDefinidosSemana": "string",
			// 	"duracionTurno": 0,
			// 	"tipoServicio": "string",
			// 	"costo": 0,
			// 	"descripcion": "string",
			// 	"idEmpresa": 0
			//   }

			// {
			// 	"costo": "1300",
			// 	"descripcion": "Descripcion del Servicio de prueba...",
			// 	"diasDefinidosSemana": "Lunes;Martes;Miercoles;Jueves;",
			// 	"duracionTurno": 60,
			// 	"horaFin": 17.5,
			// 	"horaInicio": 8.5,
			// 	"idEmpresa": 2,
			// 	"nombre": "Prueba de Servicio asd asasd",
			// 	"tipoServicio": "Prueba 2"
			// }

			CompanyServices.putServiceData(dataConvert)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleServiceDelete(guid) {
		return new Promise((resolve, reject) => {
		
			CompanyServices.deleteService(guid)
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