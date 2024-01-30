import FavoriteServices from '../services/FavoriteServices';

class FavoriteController {

	getFavoriteForCompanyJson(guid) {
		return new Promise((resolve, reject) => {
			var serviceReturn = null;
			const servicesList = databaseData.Favorite;
			serviceReturn = servicesList.filter(serv => serv.idCompany === parseInt(guid));
			resolve(serviceReturn); // porque es uno solo
		});
	}

	getFavoriteForCompany(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getFavoriteForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe pertenecer a una empresa.');
			}

			FavoriteServices.getFavoriteForCompany(guid)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavoriteForCompany', error);
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

			console.log('data: ', data);
			// var dias = data.diasList.filter(Boolean).join(';');

			var dataConvert = {	
				id: data.id,
				nombre: data.nombre,
				tipoServicio: data.tipo,
				costo: data.costo,
				horaInicio: data.comienzo,
				horaFin: data.termino,
				duracionTurno: data.turno,
				descripcion: data.descripcion,
				diasDefinidosSemana: data.selectedDias,
				idEmpresa: data.guid
			}

			// console.log('dataConvert: ', dataConvert);

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

			FavoriteServices.putServiceData(dataConvert)
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
		
			FavoriteServices.deleteService(guid)
			.then(servReturn => {
				resolve(servReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleServiceCreate(data) {
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
				throw new Error('Falta seleccionar algun dia.');
			}

			// var dias = data.diasList.filter(Boolean).join(';');

			descReplace = data.descripcion.replace(/\n/g, "\\n");

			var dataConvert = {	
				// id: data.id,
				nombre: data.nombre,
				tipoServicio: data.tipo,
				costo: data.costo,
				horaInicio: data.comienzo,
				horaFin: data.termino,
				duracionTurno: data.turno,
				descripcion: descReplace,
				diasDefinidosSemana: data.selectedDias,
				idEmpresa: data.guid
			}
			
			console.log('dataConvert: ', dataConvert);

			FavoriteServices.postServiceData(dataConvert)
			.then(srvReturn => {
				resolve(srvReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}


export default new FavoriteController();