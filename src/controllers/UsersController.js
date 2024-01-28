import UserServices from '../services/UserServices';
import CompanyServices from '../services/CompanyServices';


class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}


	handleLogin(username, password) {
		return new Promise((resolve, reject) => {

			if (username == '') {
				throw new Error('Por favor ingrese el username.');
			}
			if (password == '') {
				throw new Error('Por favor ingrese la contraseña.');
			}

			UserServices.doLogin(username, password)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleRegister(data) {
		return new Promise((resolve, reject) => {
			
			console.log(data);

			if (data.username == '') {
				throw new Error('Por favor ingrese el username.');
			}
			if (data.password == '') {
				throw new Error('Por favor ingrese la contraseña.');
			}
			if (data.nombre == '') {
				throw new Error('Por favor ingrese el nombre.');
			}
			if (data.apellido == '') {
				throw new Error('Por favor ingrese el apellido.');
			}
			if (data.email == '') {
				throw new Error('Por favor ingrese el correo electrónico.');
			}

			if (data.userType === 'customer' && data.document == '') {
				throw new Error('Por favor ingrese su documento de identidad.');
			} 
			
			if (data.userType === 'company' && data.document == '') {
				throw new Error('Por favor ingrese el RUT de su Empresa.');
			} 
		
			var dataConvert = {};
			
			if (data.userType === 'company') {
				dataConvert = {
					rutDocumento: data.document,
					razonSocial: "",
					nombrePropietario: data.firstName + ' ' + data.lastName,
					rubro: "",
					direccion: "",
					ciudad: "",
					descripcion: "",
					latitude: 0.00,
					longitude: 0.00,

					nombre: data.firstName,
					apellido: data.lastName,
					nombreUsuario: data.username,
					contrasenia: data.password,
					celular: data.movil,
					correo: data.email,
					tipoUsuario: data.userType,
					logo: '',
				}
			} else {
				dataConvert = {
					documento: data.document,

					nombre: data.firstName,
					apellido: data.lastName,
					nombreUsuario: data.username,
					contrasenia: data.password,
					celular: data.movil,
					correo: data.email,
					tipoUsuario: data.userType
				}
			}

			UserServices.postUserRegister(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdate(data) {
		return new Promise((resolve, reject) => {
		
			if (data.pass == '') {
				throw new Error('Falta la contraseña.');
			}
			if (data.firstName == '') {
				throw new Error('Falta el nombre.');
			}
			if (data.lastName == '') {
				throw new Error('Falta el apellido.');
			}
			if (data.email == '') {
				throw new Error('Falta el correo electrónico.');
			}
			if (data.movil == '') {
				throw new Error('Falta el celular.');
			}

			const dataConvert = {
				id: data.guid,
				nombre: data.firstname,
				apellido: data.lastname,
				celular: data.movil,
				correo: data.email,
			}

			UserServices.putUserData(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdatePass(data) {
		return new Promise((resolve, reject) => {

			if (data.old === '') {
				throw new Error('Debe ingresar la Contraseña Actual.');
			}
			if (data.new === '') {
				throw new Error('Debe ingresar la Contraseña Nueva.');
			}

			var json = {
                'Id':data.idu,
                'passVieja':data.old,
                'passNueva':data.new,
            }

			if (data.new !== data.old) {
				UserServices.putPassword(json)
				.then(msgReturn => {
					resolve(msgReturn);
				})
				.catch(error => {
					reject(error);
				});
			} else {
				throw new Error('La contraseña sigue siendo igual, debe ser diferente');
			}

		});
	}


	getCompanyData(guid) {
		return new Promise((resolve, reject) => {
			// console.log('getServicesForCompany', guid);
			if ((guid == '') || (guid == undefined)) {
				throw new Error('Se requiere ID de Empresa.');
			}

			CompanyServices.getDataCompany(guid)
			.then(serviceReturn => {
				// console.log('serviceReturn', serviceReturn);
				if (serviceReturn !== null) {
					resolve(serviceReturn);
				} else {
					resolve(null);
				}
			})
			.catch(error => {
				reject('Error Controller getCompanyData', error);
			});
		});
	}

	handleCompanyUpdate(data) {
		return new Promise((resolve, reject) => {
		
			if (data.rut == '') {
				throw new Error('Falta el RUT.');
			}
			// if (data.owner == '') {
			// 	throw new Error('Falta el Nombre del Propietario.');
			// }
			// if (data.businessName == '') {
			// 	throw new Error('Falta el Razon Social.');
			// }
			// if (data.category == '') {
			// 	throw new Error('Falta el Rubro.');
			// }
			// if (data.address == '') {
			// 	throw new Error('Falta la Dirección.');
			// }
			// if (data.description == '') {
			// 	throw new Error('Falta la Ddescripción.');
			// }

			if (data.location.latitude === undefined) data.location.latitude = 0.0;
			if (data.location.longitude === undefined) data.location.longitude = 0.0; 

			// console.log('data: ',data);
			var code64 = 'data:image/png;base64, ';

			var dataConvert = {
				id: data.guid,
				rutDocumento: data.rut,
				razonSocial: data.businessName,
				nombrePropietario: data.owner,
				rubro: data.category,
				direccion: data.address,
				ciudad: data.city,
				descripcion: data.description,
				latitude: data.location.latitude,
				longitude: data.location.longitude,
				logo: data.logoBase
			}
			console.log('dataConvert: ',dataConvert);
			

			CompanyServices.putCompanyData(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

}

export default new UsersController();