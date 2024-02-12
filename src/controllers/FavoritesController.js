import FavoriteServices from '../services/FavoriteServices';

class FavoriteController {


	getFavoriteForCompany(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getFavoriteForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe pertenecer a una empresa.');
			}

			FavoriteServices.getFavoriteForCompany(guid)
			.then(favoritesReturn => {
				// console.log('favoritesReturn', favoritesReturn);
				if (favoritesReturn !== null) {
					resolve(favoritesReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavoriteForCompany', error);
			});
		});
	}

	getFavoritesForService(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getFavoriteForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Debe pertenecer a un Servicio.');
			}

			FavoriteServices.getFavoritesList(guid)
			.then(favoritesReturn => {
				// console.log('favoritesReturn', favoritesReturn);
				if (favoritesReturn !== null) {
					resolve(favoritesReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavoriteForCompany', error);
			});
		});
	}

	getFavorite(idCliente,idServicio) {
		return new Promise((resolve, reject) => {
			// console.log('getFavoriteForCompany', guid);
			if ((idServicio == '') || (idServicio == undefined)) {
				throw new Error('Debe pertenecer a un Servicio.');
			}
			if ((idCliente == '') || (idCliente == undefined)) {
				throw new Error('Debe pertenecer a un Cliente.');
			}

			FavoriteServices.getFavorite(idCliente,idServicio)
			.then(favoritesReturn => {
				// console.log('favoritesReturn', favoritesReturn);
				if (favoritesReturn !== null) {
					resolve(favoritesReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getFavoriteForCompany', error);
			});
		});
	}


	handleFavoriteDelete(guid) {
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

	handleFavoriteCreate(data) {
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