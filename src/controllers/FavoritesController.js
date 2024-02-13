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
		
			FavoriteServices.deleteFavorite(guid)
			.then(favoReturn => {
				resolve(favoReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleFavoriteCreate(data) {
		return new Promise((resolve, reject) => {
			
			if (data.idcliente == '') {
				throw new Error('Falta el Cliente.');
			}
			if (data.idServicio == '') {
				throw new Error('Falta el Servicio.');
			}

			FavoriteServices.postFavorite(data)
			.then(favoReturn => {
				resolve(favoReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}


export default new FavoriteController();